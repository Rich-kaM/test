# Africa Power Advisory Holding Website

Full bilingual French/English corporate website foundation and implementation for Africa Power Advisory Holding.

## Technology

- Frontend: semantic HTML5, CSS3 and vanilla JavaScript.
- Build: Vite.
- Backend: Node.js and Express.
- Storage: private JSON data store for development and small deployments. Replace with a managed database before high-volume production use.
- Security: Helmet, rate limits, scrypt password hashing, signed HttpOnly sessions, server-side CAPTCHA verification, upload allowlisting and audit logs.
- No frontend framework or unnecessary UI dependency.

## Run in VS Code

Open this folder in VS Code, then use the integrated terminal:

```bash
npm install
npm run build
npm start
```

Open `http://localhost:3000/fr/` or `http://localhost:3000/en/`.

For development with Vite hot reload:

```bash
npm run dev
```

PowerShell shortcut:

```powershell
.\\run-local.ps1
```

macOS/Linux:

```bash
./run-local.sh
```

## Environment

Copy `.env.example` to `.env`.

Never commit `.env`.

For local testing, keep `EMAIL_MODE=sandbox` and configure no real production credentials.

To enable the mandatory Contact CAPTCHA, add:

```text
RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
```

The Contact submit button stays disabled until the CAPTCHA is completed. The server verifies the token before accepting the request.

## Admin

Open `/admin`.

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` before first startup. The server hashes the password with Node.js scrypt and creates the initial Admin account.

Roles supported by the API:

- Admin
- Editor
- Approver
- Recruiter
- Viewer

## Supplied assets

The supplied APAH logos are in `public/assets/brand/`.

The supplied co-founder portraits are in `public/assets/team/`.

The portraits are used only for the three supplied co-founders. Matthieu Abena Gongo uses a branded initials placeholder until an approved photograph is supplied.

## Social media

Add verified accounts to `content/socials.json`. The public site does not display unverified social links.

## Security and privacy

Review `docs/security-checklist.md`, `docs/third-party-services.md` and `docs/pre-launch-verification.md` before deployment.

CV uploads are stored outside the public web root and are available only through role-protected admin download endpoints.

## QA

Run:

```bash
npm run check
npm run audit
npm run test:e2e
```

The automated placeholder scanner fails the build if public output contains forbidden placeholder patterns.

## Production deployment

1. Build with `npm run build`.
2. Set production environment variables.
3. Set `NODE_ENV=production`.
4. Use HTTPS.
5. Put the Node server behind a reverse proxy such as Nginx or a managed platform.
6. Configure secure backups and log monitoring.
7. Configure a production database or managed store if volume requires it.
8. Configure the approved email provider.
9. Configure reCAPTCHA keys.
10. Run the complete QA and legal review.

## Company input required before launch

See `content/company-input.md` and `docs/pre-launch-verification.md`.

Key items include official contact details, legal identity, domain, privacy contact, expert title/biography approval, image rights and written consent, social accounts, legal review, CAPTCHA keys, newsletter configuration and recruitment retention rules.
