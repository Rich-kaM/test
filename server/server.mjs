import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(__dirname,'..');
const dataDir=path.join(root,'data');
const uploadDir=path.join(dataDir,'uploads');
fs.mkdirSync(uploadDir,{recursive:true});
const dbFile=path.join(dataDir,'store.json');
const port=Number(process.env.PORT||3000);
const isProd=process.env.NODE_ENV==='production';
const origin=process.env.APP_ORIGIN||`http://localhost:${port}`;
const sessionSecret=process.env.SESSION_SECRET||'development-only-change-this-secret';

function load(){try{return JSON.parse(fs.readFileSync(dbFile,'utf8'))}catch{return {users:[],sessions:[],inquiries:[],applications:[],subscribers:[],audit:[],actuality:[],jobs:[]}}}
let db=load();
function save(){fs.writeFileSync(dbFile,JSON.stringify(db,null,2),{mode:0o600})}
function id(){return crypto.randomUUID()}
function hashPassword(password){const salt=crypto.randomBytes(16);const hash=crypto.scryptSync(password,salt,64);return `${salt.toString('base64')}:${hash.toString('base64')}`}
function verifyPassword(password,stored){try{const [s,h]=stored.split(':');const salt=Buffer.from(s,'base64');const expected=Buffer.from(h,'base64');const actual=crypto.scryptSync(password,salt,64);return crypto.timingSafeEqual(actual,expected)}catch{return false}}
function sign(value){return crypto.createHmac('sha256',sessionSecret).update(value).digest('hex')}
function setSession(res,user){const token=crypto.randomBytes(32).toString('hex');const payload=`${token}.${user.id}.${Date.now()}`;db.sessions.push({id:token,userId:user.id,expires:Date.now()+8*60*60*1000});save();res.setHeader('Set-Cookie', `apah_session=${payload}.${sign(payload)}; Max-Age=${8*60*60}; Path=/; HttpOnly; SameSite=Lax${isProd?'; Secure':''}`);}
function getUser(req){const raw=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('apah_session='))?.split('=')[1];if(!raw)return null;const parts=raw.split('.');if(parts.length<4)return null;const sig=parts.pop();const payload=parts.join('.');if(sign(payload)!==sig)return null;const session=db.sessions.find(s=>s.id===parts[0]&&s.expires>Date.now());if(!session)return null;return db.users.find(u=>u.id===session.userId)||null}
function audit(user,action,meta={}){db.audit.push({id:id(),userId:user?.id||null,action,meta,at:new Date().toISOString()});save()}

const app=express();
app.set('trust proxy',1);
app.disable('x-powered-by');
app.use(helmet({contentSecurityPolicy:false,referrerPolicy:{policy:'strict-origin-when-cross-origin'},crossOriginEmbedderPolicy:false}));
app.use(express.json({limit:'50kb'}));
app.use(express.urlencoded({extended:false,limit:'50kb'}));
app.use(rateLimit({windowMs:60_000,limit:120,standardHeaders:'draft-8',legacyHeaders:false}));
app.use((req,res,next)=>{res.setHeader('Content-Security-Policy',"default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; connect-src 'self' https://www.google.com/recaptcha/; object-src 'none'; font-src 'self'; frame-src https://www.google.com/recaptcha/ https://www.recaptcha.net/");next()});

const publicDir=path.join(root,'public');const distDir=path.join(root,'dist');
app.use('/assets',express.static(path.join(distDir,'assets'),{immutable:true,maxAge:'1y'}));
app.use(express.static(distDir,{index:false,maxAge:isProd?'1h':0}));

function required(body,keys){return keys.every(k=>typeof body[k]==='string'&&body[k].trim().length>0)}
function originOk(req){return !isProd || req.get('origin')===origin || req.get('referer')?.startsWith(origin)}
async function verifyCaptcha(token){const secret=process.env.RECAPTCHA_SECRET_KEY;if(!secret||!token)return false;try{const r=await fetch('https://www.google.com/recaptcha/api/siteverify',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({secret,response:token})});const j=await r.json();return Boolean(j.success)}catch{return false}}

app.get('/api/config',(req,res)=>res.json({recaptchaSiteKey:process.env.RECAPTCHA_SITE_KEY||null}));
app.post('/api/contact',rateLimit({windowMs:15*60_000,limit:5,message:{message:'Too many attempts. Please try again later.'}}),async(req,res)=>{
  if(!originOk(req))return res.status(403).json({message:'Request origin is not allowed.'});
  if(!required(req.body,['fullName','email','phone','subject','message'])||!req.body.privacy){return res.status(400).json({message:'Please complete all required fields.'})}
  if(!(await verifyCaptcha(req.body.captchaToken)))return res.status(400).json({message:'Security verification failed.'});
  db.inquiries.push({id:id(),fullName:req.body.fullName.trim(),email:req.body.email.trim().toLowerCase(),phone:req.body.phone.trim(),subject:req.body.subject.trim(),message:req.body.message.trim(),language:req.body.language==='en'?'en':'fr',createdAt:new Date().toISOString(),status:'new'});save();
  res.json({ok:true});
});
app.post('/api/newsletter/subscribe',rateLimit({windowMs:60*60_000,limit:5}), (req,res)=>{
  if(!originOk(req))return res.status(403).json({message:'Request origin is not allowed.'});
  if(!required(req.body,['email'])||!req.body.consent)return res.status(400).json({message:'Please provide an email address and consent.'});
  const email=req.body.email.trim().toLowerCase();const existing=db.subscribers.find(s=>s.email===email&&s.confirmed); if(existing)return res.json({ok:true});
  const token=crypto.randomBytes(32).toString('hex');db.subscribers=db.subscribers.filter(s=>s.email!==email);db.subscribers.push({id:id(),email,language:req.body.language==='en'?'en':'fr',consentTextVersion:'v1',source:'website',consentAt:new Date().toISOString(),confirmed:false,tokenHash:crypto.createHash('sha256').update(token).digest('hex'),tokenExpires:Date.now()+60*60*1000});save();
  console.log(`[SANDBOX EMAIL] Newsletter confirmation for ${email}: ${origin}/api/newsletter/confirm?token=${token}`);
  res.json({ok:true});
});
app.get('/api/newsletter/confirm',(req,res)=>{const hash=crypto.createHash('sha256').update(String(req.query.token||'')).digest('hex');const s=db.subscribers.find(x=>x.tokenHash===hash&&x.tokenExpires>Date.now());if(!s)return res.status(400).send('Confirmation link is invalid or expired.');s.confirmed=true;s.confirmedAt=new Date().toISOString();delete s.tokenHash;delete s.tokenExpires;save();res.send('Newsletter subscription confirmed.');});
app.post('/api/newsletter/unsubscribe',rateLimit({windowMs:60*60_000,limit:5}),(req,res)=>{const email=String(req.body.email||'').trim().toLowerCase();const s=db.subscribers.find(x=>x.email===email);if(s){s.confirmed=false;s.suppressed=true;s.unsubscribedAt=new Date().toISOString();save()}res.json({ok:true});});

const upload=multer({storage:multer.diskStorage({destination:uploadDir,filename:(req,file,cb)=>cb(null,`${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)}),limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{const ext=path.extname(file.originalname).toLowerCase();cb(null,['.pdf','.docx'].includes(ext));}});
app.post('/api/applications',rateLimit({windowMs:15*60_000,limit:3}),upload.single('cv'),(req,res)=>{
  if(!originOk(req)) { if(req.file)fs.rmSync(req.file.path,{force:true}); return res.status(403).json({message:'Request origin is not allowed.'}); }
  if(!required(req.body,['fullName','email','position'])||!req.body.privacy||!req.file){if(req.file)fs.rmSync(req.file.path,{force:true});return res.status(400).json({message:'Please complete all required fields and upload a PDF or DOCX CV.'})}
  const signature=fs.readFileSync(req.file.path).subarray(0,4);const ext=path.extname(req.file.originalname).toLowerCase();const validSignature=(ext==='.pdf'&&signature.toString()==='%PDF')||(ext==='.docx'&&signature[0]===0x50&&signature[1]===0x4b);if(!validSignature){fs.rmSync(req.file.path,{force:true});return res.status(400).json({message:'The uploaded file type could not be verified.'});}
  const application={id:id(),fullName:req.body.fullName.trim(),email:req.body.email.trim().toLowerCase(),phone:String(req.body.phone||'').trim(),position:req.body.position.trim(),coverLetter:String(req.body.coverLetter||'').trim(),cvPath:req.file.path,cvOriginalName:req.file.originalname,language:req.body.language==='en'?'en':'fr',futureConsent:Boolean(req.body.futureConsent),createdAt:new Date().toISOString(),status:'received'};db.applications.push(application);save();res.json({ok:true});
});

function auth(req,res,next){const user=getUser(req);if(!user)return res.status(401).json({message:'Authentication required.'});req.user=user;next()}
function role(...roles){return (req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:'Forbidden.'})}
app.post('/api/admin/login',rateLimit({windowMs:15*60_000,limit:8}), (req,res)=>{const email=String(req.body.email||'').trim().toLowerCase();const password=String(req.body.password||'');const user=db.users.find(u=>u.email===email);if(!user||!verifyPassword(password,user.passwordHash))return res.status(401).json({message:'Invalid credentials.'});setSession(res,user);audit(user,'login');res.json({ok:true,role:user.role});});
app.post('/api/admin/logout',auth,(req,res)=>{const raw=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('apah_session='))?.split('=')[1];const token=raw?.split('.')[0];db.sessions=db.sessions.filter(s=>s.id!==token);save();audit(req.user,'logout');res.setHeader('Set-Cookie','apah_session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax');res.json({ok:true});});
app.get('/api/admin/inquiries',auth,role('Admin','Editor','Viewer'),(req,res)=>res.json(db.inquiries.map(x=>({...x,message:x.message}))));
app.get('/api/admin/applications',auth,role('Admin','Recruiter','Viewer'),(req,res)=>res.json(db.applications.map(({cvPath,...x})=>x)));
app.get('/api/admin/applications/:id/cv',auth,role('Admin','Recruiter'),(req,res)=>{const a=db.applications.find(x=>x.id===req.params.id);if(!a)return res.status(404).end();audit(req.user,'application_cv_download',{applicationId:a.id});res.download(a.cvPath,a.cvOriginalName);});
app.get('/api/admin/audit',auth,role('Admin','Viewer'),(req,res)=>res.json(db.audit.slice(-500).reverse()));
app.get('/api/admin/me',auth,(req,res)=>res.json({email:req.user.email,role:req.user.role}));

// SPA routes. Unknown routes return a real 404 status with the same app shell.
app.use((req,res)=>{
  const accepted=['/fr','/en'];
  const clean=req.path.replace(/\/$/,'');
  const known=accepted.some(x=>clean===x)||clean.startsWith('/fr/')||clean.startsWith('/en/');
  if(known && fs.existsSync(path.join(distDir,'index.html')))return res.sendFile(path.join(distDir,'index.html'));
  if(fs.existsSync(path.join(distDir,'index.html')))return res.status(404).sendFile(path.join(distDir,'index.html'));
  res.status(503).send('Site is unavailable while the production build is being prepared.');
});

// Bootstrap a development admin only when explicitly configured.
if(process.env.ADMIN_EMAIL&&process.env.ADMIN_PASSWORD&&!db.users.some(u=>u.email===process.env.ADMIN_EMAIL.toLowerCase())){db.users.push({id:id(),email:process.env.ADMIN_EMAIL.toLowerCase(),passwordHash:hashPassword(process.env.ADMIN_PASSWORD),role:'Admin',createdAt:new Date().toISOString()});save()}

app.listen(port,()=>console.log(`APAH server listening on ${origin}`));
