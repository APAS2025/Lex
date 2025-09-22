
import type { 
    User, Vendor, LexiconTerm, TermComment, DroobiVideo, Speaker, Session, OnDemandSession, 
    Manual, FlashcardDeck, Flashcard, LearningPathway, OneWaterMinute, EcosystemEntity, 
    ProfessionalTier, Badge, UserProgress
} from '../types';

// =================================================================
// USERS & PROGRESS
// =================================================================

export const users: User[] = [
  {
    id: 'user-123',
    name: 'Alex Johnson',
    email: 'alex.johnson@aquatech.com',
    avatarUrl: 'https://picsum.photos/seed/alex/200/200',
    tierId: 'T3',
    xp: 7250,
    stats: { commentsPosted: 42, documentsUploaded: 5, insightfulMarks: 15 },
    badges: ['B01', 'B02', 'B04'],
  },
  {
    id: 'user-456',
    name: 'Samira Khan',
    email: 'samira.khan@citywater.gov',
    avatarUrl: 'https://picsum.photos/seed/samira/200/200',
    tierId: 'T2',
    xp: 1500,
    stats: { commentsPosted: 15, documentsUploaded: 1, insightfulMarks: 4 },
    badges: ['B01'],
  },
  {
    id: 'user-system',
    name: 'System Admin',
    email: 'admin@languageofwater.com',
    avatarUrl: 'https://picsum.photos/seed/admin/200/200',
    tierId: 'T6',
    xp: 100000,
    stats: { commentsPosted: 0, documentsUploaded: 0, insightfulMarks: 0 },
    badges: [],
  }
];

export const currentUser: User = users[0];

export const userProgress: UserProgress = {
  dailyFlips: 3,
  decksMastered: 0,
  currentStreak: 8,
};

// =================================================================
// ECOSYSTEM & VENDORS
// =================================================================

export const vendors: Vendor[] = [
  {
    id: 'v001',
    name: 'AquaTech Solutions',
    logoUrl: 'https://picsum.photos/seed/aquatech/200/200',
    description: 'Pioneering advanced water filtration and management systems for municipal and industrial use.',
  },
  {
    id: 'v002',
    name: 'InfraFlow Dynamics',
    logoUrl: 'https://picsum.photos/seed/infraflow/200/200',
    description: 'Specializes in smart sensor networks and predictive analytics for water distribution networks.',
  },
  {
    id: 'v003',
    name: 'PureCycle Innovations',
    logoUrl: 'https://picsum.photos/seed/purecycle/200/200',
    description: 'Leading the way in wastewater treatment and resource recovery technologies.',
  },
];

export const ecosystemEntities: EcosystemEntity[] = [
  // Vendors
  {
    id: 'eco-v001',
    name: 'Xylem Inc.',
    logoUrl: 'https://picsum.photos/seed/xylem/200/200',
    type: 'Vendor',
    tagline: 'Global water technology provider for water and wastewater applications.',
    location: 'Rye Brook, NY',
    domain: 'xylem.com',
    isClaimed: false,
  },
  {
    id: 'eco-v002',
    name: 'Badger Meter',
    logoUrl: 'https://picsum.photos/seed/badger/200/200',
    type: 'Vendor',
    tagline: 'Innovator in flow measurement, control, and communications solutions.',
    location: 'Milwaukee, WI',
    domain: 'badgermeter.com',
    isClaimed: false,
  },
  {
    id: 'eco-v003',
    name: 'Mueller Water Products',
    logoUrl: 'https://picsum.photos/seed/mueller/200/200',
    type: 'Vendor',
    tagline: 'Leading manufacturer of products for water transmission and distribution.',
    location: 'Atlanta, GA',
    domain: 'muellerwaterproducts.com',
    isClaimed: false,
  },
  {
    id: 'eco-v004',
    name: 'Evoqua Water Technologies',
    logoUrl: 'https://picsum.photos/seed/evoqua/200/200',
    type: 'Vendor',
    tagline: 'Providing mission-critical water and wastewater treatment solutions.',
    location: 'Pittsburgh, PA',
    domain: 'evoqua.com',
    isClaimed: false,
  },
  {
    id: 'eco-v005',
    name: 'Grundfos',
    logoUrl: 'https://picsum.photos/seed/grundfos/200/200',
    type: 'Vendor',
    tagline: 'Advanced pump solutions and water technology.',
    location: 'Bjerringbro, Denmark (USA HQ: Brookshire, TX)',
    domain: 'grundfos.com',
    isClaimed: false,
  },
  {
    id: 'eco-v006',
    name: 'SUEZ',
    logoUrl: 'https://picsum.photos/seed/suez/200/200',
    type: 'Vendor',
    tagline: 'Water and waste management solutions for municipalities and industries.',
    location: 'Paris, France (USA HQ: Paramus, NJ)',
    domain: 'suez.com',
    isClaimed: false,
  },
  {
    id: 'eco-v007',
    name: 'American Water',
    logoUrl: 'https://picsum.photos/seed/americanwater/200/200',
    type: 'Vendor',
    tagline: 'The largest publicly traded U.S. water and wastewater utility company.',
    location: 'Camden, NJ',
    domain: 'amwater.com',
    isClaimed: false,
  },
  {
    id: 'eco-v008',
    name: 'Innovyze (An Autodesk Company)',
    logoUrl: 'https://picsum.photos/seed/innovyze/200/200',
    type: 'Vendor',
    tagline: 'Global leader in water infrastructure software.',
    location: 'Portland, OR',
    domain: 'autodesk.com',
    isClaimed: false,
  },
  {
    id: 'eco-v009',
    name: 'Hach Company',
    logoUrl: 'https://picsum.photos/seed/hach/200/200',
    type: 'Vendor',
    tagline: 'Manufacturing and distributing analytical instruments for water quality.',
    location: 'Loveland, CO',
    domain: 'hach.com',
    isClaimed: false,
  },
  {
    id: 'eco-v010',
    name: 'Trimble Water',
    logoUrl: 'https://picsum.photos/seed/trimble/200/200',
    type: 'Vendor',
    tagline: 'Data management and remote monitoring for water utilities.',
    location: 'Sunnyvale, CA',
    domain: 'trimble.com',
    isClaimed: false,
  },

  // Consultants
  {
    id: 'eco-c001',
    name: 'Black & Veatch',
    logoUrl: 'https://picsum.photos/seed/bv/200/200',
    type: 'Consultant',
    tagline: 'Employee-owned engineering, procurement, and consulting company.',
    location: 'Overland Park, KS',
    domain: 'bv.com',
    isClaimed: false,
  },
  {
    id: 'eco-c002',
    name: 'Stantec',
    logoUrl: 'https://picsum.photos/seed/stantec/200/200',
    type: 'Consultant',
    tagline: 'Designing with community in mind.',
    location: 'Edmonton, Canada (USA Offices Nationwide)',
    domain: 'stantec.com',
    isClaimed: false,
  },
  {
    id: 'eco-c003',
    name: 'Jacobs Engineering Group',
    logoUrl: 'https://picsum.photos/seed/jacobs/200/200',
    type: 'Consultant',
    tagline: 'Providing solutions for a more connected, sustainable world.',
    location: 'Dallas, TX',
    domain: 'jacobs.com',
    isClaimed: false,
  },
  {
    id: 'eco-c004',
    name: 'AECOM',
    logoUrl: 'https://picsum.photos/seed/aecom/200/200',
    type: 'Consultant',
    tagline: 'The world’s trusted infrastructure consulting firm.',
    location: 'Los Angeles, CA',
    domain: 'aecom.com',
    isClaimed: false,
  },
  {
    id: 'eco-c005',
    name: 'Hazen and Sawyer',
    logoUrl: 'https://picsum.photos/seed/hazen/200/200',
    type: 'Consultant',
    tagline: 'Engineering firm focused on drinking water and wastewater.',
    location: 'New York, NY',
    domain: 'hazenandsawyer.com',
    isClaimed: false,
  },
  {
    id: 'eco-c006',
    name: 'Carollo Engineers',
    logoUrl: 'https://picsum.photos/seed/carollo/200/200',
    type: 'Consultant',
    tagline: 'The largest firm in the U.S. dedicated solely to water.',
    location: 'Walnut Creek, CA',
    domain: 'carollo.com',
    isClaimed: false,
  },
  {
    id: 'eco-c007',
    name: 'Gannett Fleming',
    logoUrl: 'https://picsum.photos/seed/gannett/200/200',
    type: 'Consultant',
    tagline: 'A legacy of excellence in engineering and infrastructure solutions.',
    location: 'Camp Hill, PA',
    domain: 'gannettfleming.com',
    isClaimed: false,
  },
  {
    id: 'eco-c008',
    name: 'Tetra Tech',
    logoUrl: 'https://picsum.photos/seed/tetratech/200/200',
    type: 'Consultant',
    tagline: 'Leading with Science to provide solutions for water, environment, and infrastructure.',
    location: 'Pasadena, CA',
    domain: 'tetratech.com',
    isClaimed: false,
  },
  {
    id: 'eco-c009',
    name: 'Brown and Caldwell',
    logoUrl: 'https://picsum.photos/seed/bc/200/200',
    type: 'Consultant',
    tagline: 'A full-service environmental engineering and construction firm.',
    location: 'Walnut Creek, CA',
    domain: 'brownandcaldwell.com',
    isClaimed: false,
  },
  {
    id: 'eco-c010',
    name: 'Woodard & Curran',
    logoUrl: 'https://picsum.photos/seed/woodard/200/200',
    type: 'Consultant',
    tagline: 'Privately-held, integrated science, engineering, and operations company.',
    location: 'Portland, ME',
    domain: 'woodardcurran.com',
    isClaimed: false,
  },

  // Government
  {
    id: 'eco-g001',
    name: 'U.S. Environmental Protection Agency (EPA)',
    logoUrl: 'https://picsum.photos/seed/epa/200/200',
    type: 'Government',
    tagline: 'Protecting human health and the environment.',
    location: 'Washington, D.C.',
    domain: 'epa.gov',
    isClaimed: true,
    claimedByUserId: 'user-system',
  },
  {
    id: 'eco-g002',
    name: 'U.S. Geological Survey (USGS)',
    logoUrl: 'https://picsum.photos/seed/usgs/200/200',
    type: 'Government',
    tagline: 'Science for a changing world.',
    location: 'Reston, VA',
    domain: 'usgs.gov',
    isClaimed: false,
  },
  {
    id: 'eco-g003',
    name: 'Bureau of Reclamation',
    logoUrl: 'https://picsum.photos/seed/reclamation/200/200',
    type: 'Government',
    tagline: 'Managing water in the American West.',
    location: 'Washington, D.C.',
    domain: 'usbr.gov',
    isClaimed: false,
  },
  {
    id: 'eco-g004',
    name: 'California State Water Resources Control Board',
    logoUrl: 'https://picsum.photos/seed/cawater/200/200',
    type: 'Government',
    tagline: 'Preserving, enhancing, and restoring California\'s water resources.',
    location: 'Sacramento, CA',
    domain: 'waterboards.ca.gov',
    isClaimed: false,
  },
  {
    id: 'eco-g005',
    name: 'Texas Water Development Board (TWDB)',
    logoUrl: 'https://picsum.photos/seed/twdb/200/200',
    type: 'Government',
    tagline: 'Providing leadership, planning, and financial assistance for water in Texas.',
    location: 'Austin, TX',
    domain: 'twdb.texas.gov',
    isClaimed: false,
  },
  {
    id: 'eco-g006',
    name: 'New York City Department of Environmental Protection',
    logoUrl: 'https://picsum.photos/seed/nycdep/200/200',
    type: 'Government',
    tagline: 'Managing NYC\'s water supply and wastewater treatment system.',
    location: 'New York, NY',
    domain: 'nyc.gov',
    isClaimed: false,
  },
  {
    id: 'eco-g007',
    name: 'Florida Department of Environmental Protection',
    logoUrl: 'https://picsum.photos/seed/fldep/200/200',
    type: 'Government',
    tagline: 'Protecting, conserving and managing the state\'s natural resources.',
    location: 'Tallahassee, FL',
    domain: 'floridadep.gov',
    isClaimed: false,
  },
  {
    id: 'eco-g008',
    name: 'Metropolitan Water District of Southern California',
    logoUrl: 'https://picsum.photos/seed/mwd/200/200',
    type: 'Government',
    tagline: 'The nation\'s largest provider of treated drinking water.',
    location: 'Los Angeles, CA',
    domain: 'mwdh2o.com',
    isClaimed: false,
  },
  {
    id: 'eco-g009',
    name: 'Army Corps of Engineers (USACE)',
    logoUrl: 'https://picsum.photos/seed/usace/200/200',
    type: 'Government',
    tagline: 'Engineering solutions for the nation\'s toughest challenges.',
    location: 'Washington, D.C.',
    domain: 'usace.army.mil',
    isClaimed: false,
  },
  {
    id: 'eco-g010',
    name: 'Denver Water',
    logoUrl: 'https://picsum.photos/seed/denverwater/200/200',
    type: 'Government',
    tagline: 'Serving high-quality water and promoting its efficient use.',
    location: 'Denver, CO',
    domain: 'denverwater.org',
    isClaimed: false,
  },

  // Academia
  {
    id: 'eco-a001',
    name: 'Stanford University - Water in the West',
    logoUrl: 'https://picsum.photos/seed/stanford/200/200',
    type: 'Academia',
    tagline: 'Advancing understanding of water challenges in the American West.',
    location: 'Stanford, CA',
    domain: 'stanford.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a002',
    name: 'University of Michigan - Graham Sustainability Institute',
    logoUrl: 'https://picsum.photos/seed/umich/200/200',
    type: 'Academia',
    tagline: 'Mobilizing scholars to solve sustainability challenges.',
    location: 'Ann Arbor, MI',
    domain: 'umich.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a003',
    name: 'MIT - Abdul Latif Jameel Water and Food Systems Lab',
    logoUrl: 'https://picsum.photos/seed/mit/200/200',
    type: 'Academia',
    tagline: 'Research to combat water scarcity and food insecurity.',
    location: 'Cambridge, MA',
    domain: 'mit.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a004',
    name: 'Johns Hopkins University - Water Institute',
    logoUrl: 'https://picsum.photos/seed/hopkins/200/200',
    type: 'Academia',
    tagline: 'Tackling complex water challenges across the globe.',
    location: 'Baltimore, MD',
    domain: 'jhu.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a005',
    name: 'University of Arizona - Water Resources Research Center',
    logoUrl: 'https://picsum.photos/seed/uarizona/200/200',
    type: 'Academia',
    tagline: 'Connecting research to people and policy for a sustainable water future.',
    location: 'Tucson, AZ',
    domain: 'arizona.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a006',
    name: 'Colorado State University - Colorado Water Center',
    logoUrl: 'https://picsum.photos/seed/colostate/200/200',
    type: 'Academia',
    tagline: 'Leading interdisciplinary research on water issues.',
    location: 'Fort Collins, CO',
    domain: 'colostate.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a007',
    name: 'University of California, Berkeley - Water Center',
    logoUrl: 'https://picsum.photos/seed/berkeley/200/200',
    type: 'Academia',
    tagline: 'Advancing research and education in water science and policy.',
    location: 'Berkeley, CA',
    domain: 'berkeley.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a008',
    name: 'University of Texas at Austin - Center for Water and the Environment',
    logoUrl: 'https://picsum.photos/seed/utexas/200/200',
    type: 'Academia',
    tagline: 'Addressing critical issues in water resources and environmental systems.',
    location: 'Austin, TX',
    domain: 'utexas.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a009',
    name: 'Virginia Tech - Virginia Water Resources Research Center',
    logoUrl: 'https://picsum.photos/seed/virginiatech/200/200',
    type: 'Academia',
    tagline: 'Advancing water science and policy in the Commonwealth.',
    location: 'Blacksburg, VA',
    domain: 'vt.edu',
    isClaimed: false,
  },
  {
    id: 'eco-a010',
    name: 'University of Washington - Freshwater Initiative',
    logoUrl: 'https://picsum.photos/seed/uwashington/200/200',
    type: 'Academia',
    tagline: 'Connecting people and ideas to solve freshwater challenges.',
    location: 'Seattle, WA',
    domain: 'uw.edu',
    isClaimed: false,
  },

  // Non-Profit
  {
    id: 'eco-n001',
    name: 'American Water Works Association (AWWA)',
    logoUrl: 'https://picsum.photos/seed/awwa/200/200',
    type: 'Non-Profit',
    tagline: 'The largest nonprofit, scientific and educational association for water.',
    location: 'Denver, CO',
    domain: 'awwa.org',
    isClaimed: false,
  },
  {
    id: 'eco-n002',
    name: 'Water Environment Federation (WEF)',
    logoUrl: 'https://picsum.photos/seed/wef/200/200',
    type: 'Non-Profit',
    tagline: 'A global community of water professionals.',
    location: 'Alexandria, VA',
    domain: 'wef.org',
    isClaimed: false,
  },
  {
    id: 'eco-n003',
    name: 'The Water Research Foundation',
    logoUrl: 'https://picsum.photos/seed/wrf/200/200',
    type: 'Non-Profit',
    tagline: 'Advancing the science of water to improve quality of life.',
    location: 'Denver, CO',
    domain: 'waterrf.org',
    isClaimed: false,
  },
  {
    id: 'eco-n004',
    name: 'Charity: Water',
    logoUrl: 'https://picsum.photos/seed/charitywater/200/200',
    type: 'Non-Profit',
    tagline: 'Bringing clean and safe drinking water to people in developing countries.',
    location: 'New York, NY',
    domain: 'charitywater.org',
    isClaimed: false,
  },
  {
    id: 'eco-n005',
    name: 'US Water Alliance',
    logoUrl: 'https://picsum.photos/seed/uswater/200/200',
    type: 'Non-Profit',
    tagline: 'Advancing a sustainable water future for all.',
    location: 'Washington, D.C.',
    domain: 'uswateralliance.org',
    isClaimed: false,
  },
  {
    id: 'eco-n006',
    name: 'American Rivers',
    logoUrl: 'https://picsum.photos/seed/americanrivers/200/200',
    type: 'Non-Profit',
    tagline: 'Protecting wild rivers, restoring damaged rivers, and conserving clean water.',
    location: 'Washington, D.C.',
    domain: 'americanrivers.org',
    isClaimed: false,
  },
  {
    id: 'eco-n007',
    name: 'Pacific Institute',
    logoUrl: 'https://picsum.photos/seed/pacific/200/200',
    type: 'Non-Profit',
    tagline: 'Creating and advancing solutions to the world’s most pressing water challenges.',
    location: 'Oakland, CA',
    domain: 'pacinst.org',
    isClaimed: false,
  },
  {
    id: 'eco-n008',
    name: 'WateReuse Association',
    logoUrl: 'https://picsum.photos/seed/watereuse/200/200',
    type: 'Non-Profit',
    tagline: 'The internationally-recognized leader in water recycling.',
    location: 'Alexandria, VA',
    domain: 'watereuse.org',
    isClaimed: false,
  },
  {
    id: 'eco-n009',
    name: 'Water For People',
    logoUrl: 'https://picsum.photos/seed/waterforpeople/200/200',
    type: 'Non-Profit',
    tagline: 'Promoting the development of high-quality drinking water and sanitation services.',
    location: 'Denver, CO',
    domain: 'waterforpeople.org',
    isClaimed: false,
  },
  {
    id: 'eco-n010',
    name: 'National Association of Clean Water Agencies (NACWA)',
    logoUrl: 'https://picsum.photos/seed/nacwa/200/200',
    type: 'Non-Profit',
    tagline: 'The nation\'s recognized leader in legislative, regulatory, and legal advocacy on clean water issues.',
    location: 'Washington, D.C.',
    domain: 'nacwa.org',
    isClaimed: false,
  },
];


// =================================================================
// LEXICON
// =================================================================

const mockTermComments: TermComment[] = [
    {
        id: 'tc-1',
        user: users[1],
        text: 'This is a great summary. In our utility, we also consider apparent losses from unauthorized consumption to be a major factor in NRW.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        replies: [
             {
                id: 'tc-2',
                user: users[0],
                text: 'Good point, @Samira Khan. Metering inaccuracy is another big one. We just completed a city-wide meter replacement program and saw our NRW drop by 5%.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                replies: [],
            },
        ],
    },
];

export const initialTerms: LexiconTerm[] = [
  {
    id: 't001',
    term: 'Non-Revenue Water (NRW)',
    category: 'asset_mgmt',
    plainLanguageDefinition: 'Water that has been produced and is "lost" before it reaches the customer. Losses can be real losses (leaks) or apparent losses (theft or metering inaccuracies).',
    technicalDefinition: 'The difference between the volume of water put into a water distribution system and the volume of water billed to customers.',
    linkedVendorIds: ['v001', 'v002'],
    comments: mockTermComments,
  },
  {
    id: 't002',
    term: 'SCADA System',
    category: 'operations',
    plainLanguageDefinition: 'A computer system that allows a water utility to monitor and control its equipment and processes remotely, like a central nervous system for the water network.',
    technicalDefinition: 'Supervisory Control and Data Acquisition (SCADA) is a system of software and hardware elements that allows industrial organizations to control industrial processes locally or at remote locations and monitor, gather, and process real-time data.',
    linkedVendorIds: ['v002'],
    comments: [],
  },
   {
    id: 't003',
    term: 'Membrane Bioreactor (MBR)',
    category: 'governance',
    plainLanguageDefinition: 'An advanced wastewater treatment process that combines traditional biological treatment with membrane filtration, resulting in very high-quality treated water.',
    technicalDefinition: 'A process combining a suspended growth biological treatment process, typically activated sludge, with a membrane filtration system, eliminating the need for a secondary clarifier.',
    linkedVendorIds: ['v003'],
    comments: [],
  },
];

// =================================================================
// DROOBI TV
// =================================================================

const sampleHlsUrl = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8';

export const droobiVideos: DroobiVideo[] = [
  {
    id: 'dv001',
    title: 'The Digital Twin Revolution in Water Management',
    description: 'Explore how utilities are building virtual replicas of their water networks to optimize operations, predict failures, and plan for the future.',
    thumbnailUrl: 'https://picsum.photos/seed/dt-video/800/450',
    videoUrl: sampleHlsUrl,
    category: 'Technology',
    durationMinutes: 28,
    airDate: '2024-07-15T10:00:00Z',
    series_info: { title: 'Future Flow', episode: 1 },
  },
  {
    id: 'dv002',
    title: 'Decoding the Lead and Copper Rule Revisions',
    description: 'A panel of regulatory experts breaks down the latest changes to the EPA\'s Lead and Copper Rule.',
    thumbnailUrl: 'https://picsum.photos/seed/lcr-video/800/450',
    videoUrl: sampleHlsUrl,
    category: 'Regulation',
    durationMinutes: 45,
    airDate: '2024-07-10T10:00:00Z',
  },
  {
    id: 'dv003',
    title: 'Innovations in Stormwater Management',
    description: 'From permeable pavements to smart green roofs, discover the latest technologies being deployed to manage urban stormwater runoff.',
    thumbnailUrl: 'https://picsum.photos/seed/stormwater-vid/800/450',
    videoUrl: sampleHlsUrl,
    category: 'Sustainability',
    durationMinutes: 22,
    airDate: '2024-06-28T10:00:00Z',
  },
];

const speakers: Speaker[] = [
    { id: 'sp01', name: 'Dr. Elena Ramirez', affiliation: 'MIT Water Initiative', avatarInitials: 'ER' },
    { id: 'sp02', name: 'Mark Chen', affiliation: 'AquaSec Solutions', avatarInitials: 'MC' },
    { id: 'sp03', name: 'Jasmine Patel', affiliation: 'Verdant Infrastructure', avatarInitials: 'JP' },
];

export const droobiSessions: Session[] = [
    {
        id: 'ses001',
        title: 'Live Demo: AI-Powered Leak Detection Grids',
        speaker: speakers[0],
        dateTime: new Date().toISOString(),
        attendees: 1245,
        description: 'Join Dr. Ramirez for a live demonstration of next-generation acoustic sensors and machine learning algorithms that can pinpoint leaks in real-time, saving millions of gallons.',
        category: 'Treatment Technology',
        isLive: true,
        isPremium: true,
        joinUrl: '#',
        registeredAttendees: 2100,
    },
    {
        id: 'ses002',
        title: 'Deep Dive: The Future of SCADA Cybersecurity',
        speaker: speakers[1],
        dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        attendees: null,
        description: 'Explore the evolving threat landscape for water utility control systems and learn about the latest strategies and technologies for hardening your SCADA and ICS networks.',
        category: 'Cybersecurity',
        isLive: false,
        isPremium: true,
        joinUrl: '#',
        registeredAttendees: 850,
    },
     {
        id: 'ses003',
        title: 'Workshop: Implementing Green Infrastructure for CSO',
        speaker: speakers[2],
        dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        attendees: null,
        description: 'This interactive workshop will guide you through the planning, design, and implementation of green infrastructure projects to manage combined sewer overflow (CSO) events.',
        category: 'Green Infrastructure',
        isLive: false,
        isPremium: false,
        joinUrl: '#',
        registeredAttendees: 430,
    }
];

export const onDemandSessions: OnDemandSession[] = [
    {
        id: 'od001',
        title: 'PFAS Treatment: A Comparative Analysis',
        author: 'Dr. Evelyn Reed',
        views: 25800,
        rating: 4.9,
        durationMinutes: 55,
        watchUrl: '#',
        downloadUrl: '#',
    },
    {
        id: 'od002',
        title: 'Financing Capital Improvement Projects',
        author: 'David Chen, CFO',
        views: 12300,
        rating: 4.7,
        durationMinutes: 72,
        watchUrl: '#',
        downloadUrl: '#',
    },
];

// =================================================================
// MANUALS
// =================================================================

export const manuals: Manual[] = [
    {
        id: 'man001',
        title: 'AquaLeap Series 5 Centrifugal Pump',
        vendorId: 'v001',
        assetType: 'Pump',
        modelNumber: 'AL-5000',
        partNumber: 'AL-5125-B',
        summary: 'This manual provides comprehensive instructions for the installation, operation, and maintenance of the AquaLeap Series 5 Centrifugal Pump. It includes safety precautions, troubleshooting guides, and a complete parts list.',
        coverImageUrl: 'https://picsum.photos/seed/pump-manual/400/533',
        fileUrl: '#',
        uploadedAt: '2024-07-20T10:00:00Z',
    },
    {
        id: 'man002',
        title: 'FlowIntel II Ultrasonic Sensor',
        vendorId: 'v002',
        assetType: 'Sensor',
        modelNumber: 'FI-200',
        summary: 'Technical specifications and O&M guide for the FlowIntel II non-invasive ultrasonic flow sensor. Covers calibration, data integration with SCADA, and diagnostics.',
        coverImageUrl: 'https://picsum.photos/seed/sensor-manual/400/533',
        fileUrl: '#',
        uploadedAt: '2024-07-18T14:30:00Z',
    },
];

// =================================================================
// ACADEMY
// =================================================================

export const flashcardDecks: FlashcardDeck[] = [
    { id: 'deck01', title: 'Fundamentals of Water Treatment', description: 'Master the core concepts of conventional water treatment processes, from coagulation to disinfection.', thumbnail_url: 'https://picsum.photos/seed/deck01/400/225', category_id: 'operations' },
    { id: 'deck02', title: 'Key Regulatory Frameworks', description: 'Understand the major regulations governing the water sector, including the Safe Drinking Water Act and Clean Water Act.', thumbnail_url: 'https://picsum.photos/seed/deck02/400/225', category_id: 'regulations' },
    { id: 'deck03', title: 'AquaTech Solutions Product Suite', description: 'An overview of the flagship products from AquaTech Solutions for utility professionals.', thumbnail_url: 'https://picsum.photos/seed/deck03/400/225', category_id: 'asset_mgmt', vendor_ids: ['v001'], sponsorship: { sponsor_id: 'v001' } },
];

export const flashcards: Flashcard[] = [
    // Deck 1
    { id: 'card01', deck_id: 'deck01', category_id: 'operations', front: { content: 'Coagulation' }, back: { content: 'The process of adding chemicals (coagulants) to water to destabilize suspended particles, allowing them to clump together.' }, media: {} },
    { id: 'card02', deck_id: 'deck01', category_id: 'operations', front: { content: 'Flocculation' }, back: { content: 'Gentle mixing of water after coagulation to encourage the destabilized particles to collide and form larger, heavier clumps called "floc".' }, media: {} },
    // Deck 2
    { id: 'card03', deck_id: 'deck02', category_id: 'regulations', front: { content: 'Safe Drinking Water Act (SDWA)' }, back: { content: 'The principal federal law in the United States intended to ensure safe drinking water for the public.', bullets: ['Enacted in 1974', 'Authorizes EPA to set national health-based standards'] }, media: {} },
    // Deck 3
    { id: 'card04', deck_id: 'deck03', category_id: 'asset_mgmt', front: { content: 'AquaLeap Series 5 Pump' }, back: { content: 'A high-efficiency centrifugal pump designed for municipal water distribution networks.', video_url: sampleHlsUrl }, media: { image_url: 'https://picsum.photos/seed/pump-card/200/100' } },
];

export const learningPathways: LearningPathway[] = [
    { id: 'lp01', title: 'Utility Manager Certification', description: 'A comprehensive pathway covering asset management, finance, and regulatory compliance for aspiring utility leaders.', thumbnail_url: 'https://picsum.photos/seed/lp01/600/400', steps: [{ deck_id: 'deck01' }, { deck_id: 'deck02' }], badge_id: 'Cert-Manager' },
];

export const oneWaterMinute: OneWaterMinute = {
    date: new Date().toISOString().split('T')[0],
    headline: 'Understanding the SDWA',
    card_id: 'card03',
    rollup_deck_id: 'deck02'
};

// =================================================================
// GAMIFICATION
// =================================================================

export const PROFESSIONAL_TIERS: ProfessionalTier[] = [
    { id: 'T0', name: 'Associate', minXp: 0, icon: 'AcademicCapIcon' },
    { id: 'T1', name: 'Technician', minXp: 250, icon: 'AcademicCapIcon' },
    { id: 'T2', name: 'Specialist', minXp: 1000, icon: 'StarIcon' },
    { id: 'T3', name: 'Senior Specialist', minXp: 5000, icon: 'StarIcon' },
    { id: 'T4', name: 'Principal Expert', minXp: 15000, icon: 'ShieldCheckIcon' },
    { id: 'T5', name: 'Sector Leader', minXp: 50000, icon: 'SparklesIcon' },
    { id: 'T6', name: 'Infrastructure Maverick', minXp: 100000, icon: 'TrophyIcon' },
];

export const BADGES: Badge[] = [
    {
        id: 'B01',
        name: 'First Drop',
        description: 'Posted your first comment and started a conversation.',
        icon: 'ChatBubbleLeftRightIcon',
    },
    {
        id: 'B02',
        name: 'Librarian',
        description: 'Contributed your first approved document to the community library.',
        icon: 'DocumentTextIcon',
    },
    {
        id: 'B03',
        name: 'Pioneer',
        description: 'Suggested a new term via AI that was added to the lexicon.',
        icon: 'LightBulbIcon',
    },
    {
        id: 'B04',
        name: 'Community Pillar',
        description: 'Received 10 "Insightful" marks on your comments from the community.',
        icon: 'ShieldCheckIcon',
    },
    {
        id: 'B05',
        name: 'Water Warrior',
        description: 'Maintained a 7-day learning streak.',
        icon: 'FireIcon',
    }
];
