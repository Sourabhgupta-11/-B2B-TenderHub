// ---------------------------------------------------------------------------
// Guest Mode — mock data engine
//
// When a visitor clicks "Continue as Guest" we generate a fresh, randomised
// company identity plus a small ecosystem of other companies, tenders and
// applications so the whole app feels alive without touching the real
// backend or database. Everything is kept in localStorage for the duration
// of the guest session so guests can create/edit/delete tenders, apply to
// other tenders and approve applications just like a real user.
// ---------------------------------------------------------------------------

export const GUEST_MODE_KEY = 'tenderhub_guest_mode';
export const GUEST_DATA_KEY = 'tenderhub_guest_data';
export const GUEST_BANNER_KEY = 'tenderhub_guest_banner_dismissed';

// ---------------------------------------------------------------------------
// Word pools used to build believable company names
// ---------------------------------------------------------------------------
const NAME_PREFIXES = [
  'Nimbus', 'Vertex', 'Apex', 'Stellar', 'Quantum', 'Horizon', 'Pioneer',
  'Zenith', 'Greenfield', 'Falcon', 'Crescent', 'Summit', 'Bluewave',
  'Ironclad', 'Skyline', 'Novatech', 'Evergreen', 'Atlas', 'Orbit',
  'Meridian', 'Sterling', 'Catalyst', 'Trident', 'Vanguard', 'Northstar',
  'Crimson', 'Wavelength', 'Brightpath', 'Granite', 'Lumen',
];

const LEGAL_SUFFIXES = ['Pvt. Ltd.', 'Ltd.', 'Group', 'Enterprises', 'Solutions', '& Co.'];

const AVATAR_COLORS = [
  { bg: '#4D5FFF', fg: '#FFFFFF' },
  { bg: '#16A974', fg: '#FFFFFF' },
  { bg: '#FFB020', fg: '#1A1F36' },
  { bg: '#E5484D', fg: '#FFFFFF' },
  { bg: '#7C3AED', fg: '#FFFFFF' },
  { bg: '#0EA5E9', fg: '#FFFFFF' },
  { bg: '#F97316', fg: '#FFFFFF' },
  { bg: '#14B8A6', fg: '#FFFFFF' },
  { bg: '#EC4899', fg: '#FFFFFF' },
  { bg: '#1B2A6B', fg: '#FFFFFF' },
];

// ---------------------------------------------------------------------------
// Industry pools — each has naming words, products and a few tender templates
// ---------------------------------------------------------------------------
const INDUSTRIES = [
  {
    key: 'logistics',
    industry: 'Logistics & Supply Chain',
    nameWords: ['Logistics', 'Cargo', 'Freight Lines', 'Supply Chain'],
    products: ['Freight Forwarding', 'Warehousing & Storage', 'Fleet Management', 'Cold Chain Logistics', 'Last-Mile Delivery', 'Customs Clearance'],
    description: (name) => `${name} moves goods across India through a network of regional warehouses, a modern fleet and end-to-end freight solutions for manufacturers and retailers.`,
    tenders: [
      { title: 'Pan-India Freight Distribution Network', description: 'Seeking a logistics partner to manage freight distribution across 12 states, including route planning, regional hub warehousing and real-time shipment tracking.', budget: [800000, 4500000] },
      { title: 'Warehouse Management System Procurement', description: 'Looking for a cloud-based warehouse management system covering inventory tracking, barcode scanning and ERP integration across 4 regional hubs.', budget: [300000, 1200000] },
      { title: 'Cold Chain Transport for Perishable Goods', description: 'Require a vendor to provide refrigerated transport and storage for perishable food products between processing units and regional distribution centres.', budget: [500000, 2500000] },
    ],
  },
  {
    key: 'construction',
    industry: 'Construction & Infrastructure',
    nameWords: ['Constructions', 'Infrastructure', 'Builders', 'Projects'],
    products: ['Civil Construction', 'Road & Highway Works', 'Structural Steel Fabrication', 'Project Management Consulting', 'Electrical & Plumbing Works', 'Interior Fit-outs'],
    description: (name) => `${name} delivers civil construction and infrastructure projects on time and on budget, from commercial complexes to road and utility works.`,
    tenders: [
      { title: 'Construction of Commercial Office Complex – Phase 1', description: 'Inviting bids for the civil construction of a 5-storey commercial office complex, including foundation, structural work and exterior finishing.', budget: [15000000, 80000000] },
      { title: 'Road Resurfacing and Drainage Works', description: 'Tender for resurfacing of a 6 km internal road network along with upgrading the stormwater drainage system.', budget: [2500000, 12000000] },
      { title: 'Structural Steel Supply for Warehouse Project', description: 'Procurement of structural steel members for a new warehouse facility, including fabrication and on-site erection support.', budget: [1800000, 9000000] },
    ],
  },
  {
    key: 'energy',
    industry: 'Renewable Energy',
    nameWords: ['Energy', 'Power Solutions', 'Renewables', 'Solar'],
    products: ['Solar EPC Services', 'Wind Turbine O&M', 'Energy Audits', 'Battery Storage Systems', 'Rooftop Solar Installation', 'Grid Integration'],
    description: (name) => `${name} helps businesses transition to clean energy through solar EPC, storage systems and ongoing maintenance contracts.`,
    tenders: [
      { title: 'Rooftop Solar Installation for Manufacturing Unit', description: 'Seeking an EPC contractor for a 500 kW rooftop solar installation at our manufacturing facility, including grid synchronisation and 1-year O&M.', budget: [12000000, 30000000] },
      { title: 'Annual Maintenance Contract for Wind Turbines', description: 'Tender for an annual maintenance contract covering 8 wind turbines, including preventive maintenance, spare parts and emergency callouts.', budget: [1500000, 5000000] },
      { title: 'Supply of Lithium-Ion Battery Storage Units', description: 'Procurement of containerised lithium-ion battery storage units for peak-load management at our industrial site.', budget: [4000000, 18000000] },
    ],
  },
  {
    key: 'it',
    industry: 'Information Technology',
    nameWords: ['Technologies', 'Software', 'Systems', 'Infotech'],
    products: ['Custom Software Development', 'Cloud Infrastructure Management', 'Cybersecurity Audits', 'IT Helpdesk Support', 'ERP Implementation', 'Data Analytics Services'],
    description: (name) => `${name} builds and manages software, cloud and security solutions that help businesses run more efficiently.`,
    tenders: [
      { title: 'Development of Inventory Management Web App', description: 'Seeking a development partner to build a web-based inventory management application with multi-warehouse support and reporting dashboards.', budget: [600000, 2500000] },
      { title: 'Cloud Migration and DevOps Support', description: 'Tender for migrating on-premise infrastructure to the cloud and setting up CI/CD pipelines with ongoing DevOps support.', budget: [900000, 4000000] },
      { title: 'Cybersecurity Audit & VAPT Services', description: 'Request for proposals for a comprehensive vulnerability assessment and penetration testing engagement across web and network infrastructure.', budget: [300000, 1500000] },
    ],
  },
  {
    key: 'textiles',
    industry: 'Textiles & Apparel',
    nameWords: ['Textiles', 'Fabrics', 'Apparel', 'Weaves'],
    products: ['Cotton Yarn Manufacturing', 'Garment Stitching & Finishing', 'Fabric Dyeing & Printing', 'Export Packaging Solutions', 'Quality Testing Labs', 'Sustainable Fabric Sourcing'],
    description: (name) => `${name} manufactures and exports high-quality fabrics and garments, serving brands across domestic and international markets.`,
    tenders: [
      { title: 'Bulk Order: Cotton Fabric Manufacturing', description: 'Seeking a manufacturer for a bulk order of 100% cotton fabric in specified weaves and weights for an upcoming production cycle.', budget: [1000000, 5000000] },
      { title: 'Garment Stitching Contract – Winter Collection', description: 'Tender for stitching and finishing services for a winter apparel collection, with quality control and on-time delivery requirements.', budget: [700000, 3000000] },
      { title: 'Export-Grade Packaging Solutions', description: 'Request for proposals for export-grade packaging materials and solutions for garment shipments to international markets.', budget: [200000, 900000] },
    ],
  },
  {
    key: 'healthcare',
    industry: 'Healthcare & Pharma',
    nameWords: ['Healthcare', 'Lifesciences', 'Medico', 'Pharma'],
    products: ['Medical Equipment Supply', 'Pharma Distribution', 'Diagnostic Lab Services', 'Hospital Housekeeping', 'Ambulance Services', 'Healthcare IT Solutions'],
    description: (name) => `${name} supports hospitals and clinics with equipment, distribution and support services that keep care running smoothly.`,
    tenders: [
      { title: 'Supply of Diagnostic Imaging Equipment', description: 'Tender for supply, installation and commissioning of diagnostic imaging equipment for a multi-speciality hospital.', budget: [8000000, 35000000] },
      { title: 'Annual Pharma Distribution Contract', description: 'Seeking a distribution partner for an annual contract covering pharmaceutical supply to a regional network of pharmacies.', budget: [3000000, 15000000] },
      { title: 'Hospital Housekeeping & Sanitation Services', description: 'Request for proposals for housekeeping, sanitation and waste management services across a 200-bed hospital facility.', budget: [600000, 2400000] },
    ],
  },
  {
    key: 'agro',
    industry: 'Agriculture & Food Processing',
    nameWords: ['Agro', 'Foods', 'Agritech', 'Harvest'],
    products: ['Grain Procurement', 'Food Packaging Solutions', 'Cold Storage Facilities', 'Organic Fertilizer Supply', 'Agri-Equipment Rental', 'Farm-to-Retail Distribution'],
    description: (name) => `${name} connects farms to markets through procurement, processing and cold-chain infrastructure for the food sector.`,
    tenders: [
      { title: 'Procurement of Wheat & Rice for Distribution', description: 'Tender for seasonal procurement of wheat and rice from registered suppliers for distribution to regional outlets.', budget: [5000000, 25000000] },
      { title: 'Cold Storage Facility – Build & Operate', description: 'Seeking a partner to build and operate a 5,000 MT cold storage facility under a long-term agreement.', budget: [20000000, 60000000] },
      { title: 'Supply of Organic Fertilizers for Farm Cooperative', description: 'Request for proposals for bulk supply of certified organic fertilizers to a network of farm cooperatives.', budget: [800000, 3500000] },
    ],
  },
  {
    key: 'finance',
    industry: 'Finance & Consulting',
    nameWords: ['Capital', 'Advisors', 'Consulting', 'Finserv'],
    products: ['Financial Advisory', 'Tax & Compliance Services', 'Internal Audit', 'Business Loan Facilitation', 'Payroll Management', 'M&A Advisory'],
    description: (name) => `${name} provides financial advisory, audit and compliance services that help growing businesses stay on solid ground.`,
    tenders: [
      { title: 'Annual Internal Audit Engagement', description: 'Tender for an internal audit engagement covering financial controls, procurement processes and compliance across all branches.', budget: [600000, 2500000] },
      { title: 'Payroll Management Outsourcing', description: 'Seeking a partner to manage end-to-end payroll processing, statutory compliance and employee self-service for a 600-person workforce.', budget: [400000, 1800000] },
      { title: 'Tax Advisory for Multi-State Operations', description: 'Request for proposals for ongoing tax advisory and compliance support across operations spanning multiple states.', budget: [300000, 1200000] },
    ],
  },
  {
    key: 'manufacturing',
    industry: 'Industrial Manufacturing',
    nameWords: ['Industries', 'Engineering', 'Manufacturing', 'Components'],
    products: ['Auto Component Manufacturing', 'CNC Precision Machining', 'Sheet Metal Fabrication', 'Plastic Injection Molding', 'Industrial Automation', 'Quality Inspection Services'],
    description: (name) => `${name} manufactures precision components and industrial parts for automotive and engineering clients, backed by strong quality systems.`,
    tenders: [
      { title: 'Supply of CNC Machined Components', description: 'Tender for the supply of precision CNC machined components as per provided drawings, with strict tolerance and quality requirements.', budget: [1200000, 6000000] },
      { title: 'Sheet Metal Fabrication for Assembly Line', description: 'Seeking a fabrication partner for sheet metal parts required for a new assembly line, including tooling and prototyping.', budget: [900000, 4500000] },
      { title: 'Industrial Automation Retrofit Project', description: 'Request for proposals to retrofit existing production lines with PLC-based automation and sensor integration.', budget: [3000000, 14000000] },
    ],
  },
];

const PROPOSAL_OPENERS = [
  "We'd be glad to take this on.",
  'Our team has reviewed the requirements closely and is confident we can deliver.',
  'This is squarely within our core expertise.',
  "We've delivered similar projects successfully in the past and would welcome the opportunity.",
  'Our capacity and timelines line up well with what you need here.',
];

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randomInt(0, arr.length - 1)];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const genId = () => Array.from({ length: 24 }, () => randomInt(0, 15).toString(16)).join('');

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

const futureDateISO = (minDays, maxDays) => {
  const d = new Date();
  d.setDate(d.getDate() + randomInt(minDays, maxDays));
  return d.toISOString();
};

const proposalFor = (company, tender) => {
  const years = randomInt(3, 15);
  return `${pick(PROPOSAL_OPENERS)} With ${years}+ years of experience in ${company.industry.toLowerCase()}, ${company.name} can deliver high-quality results within your timeline at a competitive price. Looking forward to working with you on "${tender.title}".`;
};

const bidFor = (budget) => Math.round((budget * (0.85 + Math.random() * 0.3)) / 1000) * 1000;

// ---------------------------------------------------------------------------
// Company / tender / application builders
// ---------------------------------------------------------------------------
const buildCompany = (usedNames) => {
  let name, prefix, word, legal, ind;
  do {
    ind = pick(INDUSTRIES);
    prefix = pick(NAME_PREFIXES);
    word = pick(ind.nameWords);
    legal = pick(LEGAL_SUFFIXES);
    name = `${prefix} ${word} ${legal}`;
  } while (usedNames.has(name));
  usedNames.add(name);

  const color = pick(AVATAR_COLORS);

  return {
    _id: genId(),
    name,
    industry: ind.industry,
    description: ind.description(name),
    products: shuffle(ind.products).slice(0, randomInt(3, 4)),
    logoUrl: '',
    avatarColor: color.bg,
    avatarText: color.fg,
    email: `contact@${slugify(prefix)}${slugify(word)}.com`,
    __industry: ind,
  };
};

const buildTender = (template, company) => {
  const [minB, maxB] = template.budget;
  return {
    _id: genId(),
    title: template.title,
    description: template.description,
    deadline: futureDateISO(7, 60),
    budget: randomInt(minB, maxB),
    createdBy: { _id: company._id, name: company.name },
    status: 'open',
    createdAt: new Date().toISOString(),
  };
};

const buildMyApplication = (tender, myCompany, status) => ({
  _id: genId(),
  tenderId: { _id: tender._id, title: tender.title, deadline: tender.deadline },
  proposalText: proposalFor(myCompany, tender),
  bidAmount: bidFor(tender.budget),
  status,
});

const buildReceivedApplication = (tender, fromCompany, status) => ({
  _id: genId(),
  tenderId: { _id: tender._id, title: tender.title },
  companyId: { _id: fromCompany._id, name: fromCompany.name, industry: fromCompany.industry },
  proposalText: proposalFor(fromCompany, tender),
  bidAmount: bidFor(tender.budget),
  status,
});

const stripInternal = (c) => {
  const { __industry, ...rest } = c;
  return rest;
};

// ---------------------------------------------------------------------------
// Main generator — produces a brand-new, fully randomised guest "world"
// ---------------------------------------------------------------------------
export const generateGuestData = () => {
  const usedNames = new Set();

  // The guest's own company
  const guestCompany = buildCompany(usedNames);

  // A handful of other companies that already exist on the platform
  const otherCompanies = Array.from({ length: 6 }, () => buildCompany(usedNames));

  // Guest's own tenders, drawn from their industry's tender templates
  const myTenderTemplates = shuffle(guestCompany.__industry.tenders).slice(0, randomInt(2, 3));
  const myTenders = myTenderTemplates.map((t) => buildTender(t, guestCompany));

  // Tenders posted by the other companies
  const otherTenders = [];
  otherCompanies.forEach((c) => {
    const templates = shuffle(c.__industry.tenders).slice(0, randomInt(1, 2));
    templates.forEach((t) => otherTenders.push(buildTender(t, c)));
  });

  // Applications the guest has already submitted to other tenders
  const appliedTenders = shuffle(otherTenders).slice(0, Math.min(3, otherTenders.length));
  const myAppStatuses = shuffle(['pending', 'pending', 'approved', 'rejected']);
  const myApplications = appliedTenders.map((t, i) => buildMyApplication(t, guestCompany, myAppStatuses[i % myAppStatuses.length]));

  // Applications other companies have submitted to the guest's tenders
  const receivedApplications = [];
  myTenders.forEach((tender) => {
    const applicants = shuffle(otherCompanies).slice(0, randomInt(1, 2));
    applicants.forEach((c) => {
      receivedApplications.push(buildReceivedApplication(tender, c, 'pending'));
    });
  });

  return {
    company: stripInternal(guestCompany),
    otherCompanies: otherCompanies.map(stripInternal),
    myTenders,
    otherTenders,
    myApplications,
    receivedApplications,
    sessionStarted: new Date().toISOString(),
  };
};

// ---------------------------------------------------------------------------
// Session helpers
// ---------------------------------------------------------------------------
export const isGuestMode = () => {
  try {
    return localStorage.getItem(GUEST_MODE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const getGuestData = () => {
  try {
    const raw = localStorage.getItem(GUEST_DATA_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setGuestData = (data) => {
  try {
    localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors (e.g. private browsing quota)
  }
};

// Generates a brand new mock identity + dataset and switches the app into
// guest mode. Call this every time someone clicks "Continue as Guest" so
// each visitor gets a different company, tenders and applications.
export const startGuestSession = () => {
  const data = generateGuestData();
  localStorage.removeItem('token');
  localStorage.setItem(GUEST_MODE_KEY, 'true');
  localStorage.removeItem(GUEST_BANNER_KEY);
  setGuestData(data);
  return data;
};

export const endGuestSession = () => {
  localStorage.removeItem(GUEST_MODE_KEY);
  localStorage.removeItem(GUEST_DATA_KEY);
  localStorage.removeItem(GUEST_BANNER_KEY);
};

export { genId };
