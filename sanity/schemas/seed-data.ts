// ═══════════════════════════════════════════════════════
// SEED DATA — Copy these values into Sanity Studio
// ═══════════════════════════════════════════════════════
// Go to studio.morajgroup.com and create documents
// with the data below to populate the site immediately.

export const SEED = {

  siteSettings: {
    phone: '+91 98205 77144',
    email: 'sales@morajinfratech.com',
    address: '18th Floor, The Affaires,\nSanpada, Navi Mumbai 400705',
    officeHours: 'Monday – Saturday · 9am – 7pm',
    stats: [
      { value: '40', unit: '+', label: 'Years of excellence' },
      { value: '30', unit: '+', label: 'Residences delivered' },
      { value: '5',  unit: 'L+', label: 'Sq. ft. developed' },
      { value: '2',  unit: 'K+', label: 'Families housed' },
    ],
    introPhilosophy: 'Our Philosophy',
    introParagraph1: 'Since 1985, Moraj Group has shaped the residential landscape of Navi Mumbai. As a fully integrated developer — architecture, engineering, interiors — we have never compromised on quality or delivery.',
    introParagraph2: 'Every residence we build reflects international construction standards, thoughtful spatial design, and a relentless commitment to the families who call our homes their own.',
    legacyQuote: '"Honesty and quality are not features — they are the foundation on which every Moraj home stands. That belief has not changed in forty years."',
    craftParagraph1: 'Unlike most developers, Moraj Group controls every stage of construction under one roof. From architecture and structural engineering to interior design and finishing — no contractor handles what we can do better ourselves.',
    craftParagraph2: 'This integrated approach has been our foundation for over four decades, and it is why every Moraj residence delivers exactly what was promised — on time, without exception.',
    craftValues: [
      { title: 'In-house design',        body: 'Architecture and execution under one roof' },
      { title: 'On-time delivery',        body: '30+ projects handed over as promised' },
      { title: 'International standards', body: 'Global construction benchmarks applied' },
      { title: 'Lifestyle-first',         body: 'Spaces designed for how families truly live' },
    ],
    enquireHeading: 'Your dream home is waiting for you.',
    enquireSub: 'Schedule a complimentary site visit. Our team will guide you through every detail — no pressure, just possibilities.',
  },

  /** Create as document _id `pressContent`, type `pressContent`. */
  pressContent: {
    logos: [],
    fallbackPublicationNames: ['Times of India', 'Hindustan Times', 'Maharashtra Times', 'DNA India', 'Lokmat'],
  },

  hero: {
    heading: 'Where every home tells a story of',
    headingItalic: 'enduring craft.',
    subheading: "Navi Mumbai's Trusted Developer · Est. 1985",
    ctaLabel: 'Explore Residences',
    ctaHref: '#residences',
    videoLabel: 'Watch our story',
    droneTagText: '4K Aerial · Panvel–Sanpada Corridor',
  },

  residences: [
    {
      title: 'Moraj Opulence',
      slug: 'moraj-opulence',
      order: 1,
      status: 'new-launch',
      location: 'Panvel, Navi Mumbai',
      configuration: '2 & 3 BHK',
      area: '850 – 1400 sq. ft.',
      pricing: 'On request',
      rera: 'P52000001234',
      description: 'Moraj Opulence redefines luxury living in Panvel with thoughtfully designed 2 and 3 BHK residences. Crafted with premium materials and international finishes, each home is a testament to four decades of building excellence.',
      amenities: ['Swimming Pool', 'Gymnasium', 'Clubhouse', 'Children\'s Play Area', 'Landscaped Gardens', 'Covered Parking', '24/7 Security', 'Power Backup'],
    },
    {
      title: 'Silent Valley',
      slug: 'silent-valley',
      order: 2,
      status: 'ongoing',
      location: 'Kharghar, Navi Mumbai',
      configuration: '1 & 2 BHK',
      area: '520 – 950 sq. ft.',
      pricing: 'On request',
      rera: 'P52000005678',
      description: 'Nestled amid the green hills of Kharghar, Silent Valley offers a serene escape from city life without sacrificing connectivity. Designed for modern families who value nature and quality living.',
      amenities: ['Jogging Track', 'Amphitheatre', 'Senior Citizen Corner', 'Indoor Games Room', 'Landscaped Courts', 'CCTV Surveillance'],
    },
    {
      title: 'Jewel Crest',
      slug: 'jewel-crest',
      order: 3,
      status: 'ongoing',
      location: 'Ulwe, Navi Mumbai',
      configuration: '1 & 2 BHK',
      area: '480 – 870 sq. ft.',
      pricing: 'On request',
      rera: 'P52000009012',
      description: 'Jewel Crest in Ulwe is strategically located near the upcoming Navi Mumbai International Airport corridor, making it a sound investment and a beautiful home for young families.',
      amenities: ['Rooftop Deck', 'Co-working Lounge', 'Yoga Studio', 'Party Lawn', 'EV Charging Points', 'Smart Home Features'],
    },
    {
      title: 'Waterfall Gateway',
      slug: 'waterfall-gateway',
      order: 4,
      status: 'completed',
      location: 'Panvel, Navi Mumbai',
      configuration: '2 BHK',
      area: '780 – 1050 sq. ft.',
      pricing: 'Sold out',
      rera: 'P52000003456',
      description: 'Waterfall Gateway is one of Moraj Group\'s landmark completed projects in Panvel — delivered on time, with every promise kept. A community of proud homeowners.',
    },
  ],

  teamMembers: [
    {
      name: 'Mohan Gurnani',
      role: 'Chairman & Founder',
      order: 1,
      bio: 'Widely respected for his honesty and credibility, Mohan Gurnani played a pivotal role in establishing Navi Mumbai\'s APMC market and built Moraj Group\'s four-decade legacy on a foundation of integrity.',
    },
    {
      name: 'Priyaa Gurnani',
      role: 'Director, Design & Interiors',
      order: 2,
      bio: 'With 35+ years in interior design across banks, residences and corporate spaces, Priyaa brings a refined design sensibility to every Moraj project\'s spatial planning, material selection and finishing standards.',
    },
    {
      name: 'Vansh Gurnani',
      role: 'Director, Strategy & Growth',
      order: 3,
      bio: 'Blending entrepreneurial precision with inherited wisdom, Vansh leads Moraj\'s next chapter — bringing modern thinking and global standards to a brand built on four decades of trust and community.',
    },
  ],

  testimonials: [
    {
      name: 'Avishkar Patil',
      residence: 'Moraj Opulence',
      location: 'Panvel',
      quote: 'The construction quality exceeded every expectation — superb finishes, a thoughtfully designed layout, and delivery exactly on schedule. From first meeting to handover, the experience was truly seamless.',
      rating: 5,
    },
    {
      name: 'Kamlesh Yadav',
      residence: 'Jewel Crest',
      location: 'Ulwe',
      quote: 'A premium address, fair pricing, and a team that kept every single promise. Choosing Moraj Group was the most reassuring decision our family made — we feel truly at home.',
      rating: 5,
    },
  ],
}
