export const services = [
  ['energy-advisory','Energy Advisory','Conseil énergétique','Electricity market analysis, forecasting, economic studies, financial analysis, feasibility studies, investment advisory, research and business strategy.'],
  ['power-systems','Power Systems and Infrastructure','Systèmes électriques et infrastructures','Generation, transmission, distribution, power-system planning, smart grids, energy management and grid modernization.'],
  ['energy-projects','Energy Projects','Projets énergétiques','Solar, hydropower, wind, biomass and thermal project development, engineering support and project supervision.'],
  ['power-procurement','Power Procurement','Approvisionnement en électricité','Procurement strategy, PPA advisory, contract analysis, negotiation support and energy supply strategy.'],
  ['energy-efficiency','Energy Efficiency and Optimization','Efficacité énergétique et optimisation','Energy audits, consumption analysis, energy-cost optimization, industrial efficiency and operational optimization.'],
  ['energy-transition','Energy Transition and Sustainability','Transition énergétique et durabilité','Energy transition, industrial decarbonization, carbon-footprint assessment, carbon markets, green certificates and storage.'],
  ['regulation-policy','Regulation and Policy','Réglementation et politiques publiques','Sector regulation, regulatory monitoring, policy analysis, regulatory advisory, research and compliance support.'],
  ['data-energy-intelligence','Data and Energy Intelligence','Données et intelligence énergétique','Data analysis, demand forecasting, market intelligence, dashboards, asset analytics, performance monitoring and decision-support systems.']
].map(([slug,en,fr,desc]) => ({slug,en,fr,desc}));

export const industries = [
  ['utilities','Utilities','Services publics'],['government','Government','Gouvernement'],['mining','Mining','Mines'],['industrial','Industrial','Industries'],['commercial','Commercial','Commercial'],['energy-developers','Energy Developers and Power Producers','Développeurs énergétiques et producteurs'],['investors','Investors and Financial Institutions','Investisseurs et institutions financières'],['infrastructure','Infrastructure Companies','Entreprises d’infrastructure'],['development-partners','Development Partners','Partenaires au développement'],['large-consumers','Large Electricity Consumers','Grands consommateurs d’électricité']
].map(([slug,en,fr]) => ({slug,en,fr}));

export const experts = [
  {
    slug:'oguzu-lee-denis', name:'Oguzu Lee Denis', titleEn:'Member of Parliament for Maracha County, Uganda', titleFr:'Member of Parliament for Maracha County, Uganda', image:'/assets/team/oguzu-lee-denis.jpg',
    bioEn:'A Ugandan Member of Parliament for Maracha County, technology innovator, and champion for governance reform. Recognized by the World Health Organization for designing a national emergency ambulance service framework, he leverages his ICT background to drive digital infrastructure expansion, curb illicit financial flows, and foster transparent, youth inclusive development.',
    bioFr:'Profile supplied in English. A French version requires company review before publication.',
    expertiseEn:['Governance reform','ICT','Digital infrastructure','Youth inclusive development'],
    expertiseFr:['Governance reform','ICT','Digital infrastructure','Youth inclusive development']
  },
  {
    slug:'christian-bakole-mukulu', name:'Christian Bakole Mukulu', titleEn:'Deputy Director of Economic and Pricing Affairs, ARE', titleFr:'Deputy Director of Economic and Pricing Affairs, ARE', image:'/assets/team/christian-bakole-mukulu.jpg',
    bioEn:'A Congolese energy economist and Deputy Director of Economic and Pricing Affairs at the Democratic Republic of the Congo’s Electricity Regulatory Authority (ARE). A former Hubert H. Humphrey and Mandela Washington Fellow at UC Davis, he holds a Master’s degree in Energy Science and Policy and completed specialized training with the Korea Energy Agency. Supported by World Bank funding as a senior expert on electricity tariff analysis and market regulation, he actively promotes household level energy efficiency and sustainable energy transition strategies across the DRC.',
    bioFr:'Profile supplied in English. A French version requires company review before publication.',
    expertiseEn:['Energy economics','Electricity tariffs','Market regulation','Energy efficiency'],
    expertiseFr:['Energy economics','Electricity tariffs','Market regulation','Energy efficiency']
  },
  {
    slug:'geoffrey-aori-mabea', name:'Dr. Geoffrey Aori Mabea', titleEn:'CEO, RAERESA/COMESA', titleFr:'CEO, RAERESA/COMESA', image:'/assets/team/geoffrey-aori-mabea.jpg',
    bioEn:'A Kenyan energy economist, author, and executive serving as the CEO of the Regional Association of Energy Regulators for Eastern and Southern Africa (RAERESA/COMESA). Holding a PhD in Energy Economics from the University of Dundee, he brings extensive leadership experience from Kenya’s geothermal sector, PwC, and EREA, where he spearheaded the East African Community Energy Union and founded the Energy Regulation Centre of Excellence to drive cross border power market integration, tariff reform, and sustainable energy policy harmonization.',
    bioFr:'Profile supplied in English. A French version requires company review before publication.',
    expertiseEn:['Energy economics','Regional regulation','Power market integration','Tariff reform'],
    expertiseFr:['Energy economics','Regional regulation','Power market integration','Tariff reform']
  },
  {
    slug:'matthieu-abena-gongo', name:'Matthieu Abena Gongo', titleEn:'Coordinator, Technical and Economic Support Unit (CATE)', titleFr:'Coordinator, Technical and Economic Support Unit (CATE)', image:null,
    bioEn:'A Congolese energy expert and public policy advisor with extensive technical and strategic leadership in the Democratic Republic of the Congo’s power sector. Serving as Coordinator of the Technical and Economic Support Unit (CATE), he leads the planning, economic analysis, and validation of national energy projects, building on his prior experience as Chief of Staff at the Ministry of Energy and Hydraulic Resources and chair of the steering committee for the landmark Busanga Hydroelectric Power Station.',
    bioFr:'Profile supplied in English. A French version requires company review before publication.',
    expertiseEn:['Energy policy','Power-sector planning','Economic analysis','Project governance'],
    expertiseFr:['Energy policy','Power-sector planning','Economic analysis','Project governance']
  }
];

export const pages = {
  about: {en:'About Us',fr:'À propos'}, projects:{en:'Projects',fr:'Projets'}, insights:{en:'Insights',fr:'Analyses'}, actuality:{en:'Actuality',fr:'Actualités'}, sustainability:{en:'Sustainability',fr:'Durabilité'}, experts:{en:'Experts',fr:'Experts'}, careers:{en:'Careers',fr:'Carrières'}, contact:{en:'Contact',fr:'Contact'}, newsletter:{en:'Newsletter',fr:'Newsletter'}
};

export const legalPages = {
  privacy:{en:'Privacy Policy',fr:'Politique de confidentialité'}, terms:{en:'Terms and Conditions',fr:'Conditions générales'}, cookies:{en:'Cookie Policy',fr:'Politique relative aux cookies'}, consent:{en:'Consent Management',fr:'Gestion du consentement'}, accessibility:{en:'Accessibility Statement',fr:'Déclaration d’accessibilité'}, notices:{en:'Legal Notices',fr:'Mentions légales'}, recruitment:{en:'Recruitment Privacy Notice',fr:'Notice de confidentialité du recrutement'}
};
