
import { Product, Achievement, Market, Testimonial, Award, BlogPost } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', stat: '50+', label: 'Years of Expertise', icon: 'fa-calendar-check' },
  { id: '2', stat: '150M+', label: 'Pieces Delivered', icon: 'fa-box-open' },
  { id: '3', stat: '4', label: 'Continents Served', icon: 'fa-globe' },
  { id: '4', stat: 'In-House', label: 'Galvanizing Plant', icon: 'fa-industry' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Barbed Wire Arms',
    description: 'Heavy-duty industrial security fencing accessory designed for high-security perimeter installations. Engineered to carry multiple strands of barbed wire or concertina coils.',
    features: ['Precision pressed steel', 'Single and Double V-Arm variants', 'Pre-punched holes for easy wire threading'],
    image: '/assets/products/1.png',
    category: 'Security Fencing',
    materials: ['Pressed Steel', 'Malleable Iron'],
    standards: ['ASTM F626', 'ISO 1461'],
    specifications: {
      'Gauge Thickness': '14 GA / 16 GA',
      'Coating': 'Hot-Dip Galvanized (Min 2.0 oz/sq ft)',
      'Height Range': '12" - 24"',
      'Arm Angle': '45 Degrees / 90 Degrees'
    },
    isBestseller: true
  },
  {
    id: 'p2',
    name: 'Industrial Fence Caps',
    description: 'High-precision post caps providing critical moisture protection for hollow fence posts. Available in decorative and standard industrial profiles.',
    features: ['Water-tight friction fit', 'High corrosion resistance', 'Aesthetic pyramid or dome designs'],
    image: '/assets/products/56.jpg',
    category: 'Hardware',
    materials: ['Aluminum', 'Pressed Steel', 'Malleable Iron'],
    standards: ['ASTM F626'],
    specifications: {
      'Available Sizes': '1-3/8" to 8-5/8"',
      'Wall Thickness': '0.065" to 0.125"',
      'Finish': 'Natural / Galvanized / Powder Coated',
      'Type': 'External Fit / Internal Plug'
    }
  },
  {
    id: 'p3',
    name: 'Tension & Brace Bands',
    description: 'Essential connectors for securing chain-link mesh to terminal posts. Our bands are known for their exceptional yield strength and uniform galvanizing.',
    features: ['Square shoulder for carriage bolts', 'High-tensile steel bands', 'Uniform edge finish to prevent mesh snags'],
    image: '/assets/products/48.jpg',
    category: 'Connections',
    materials: ['Pressed Steel'],
    standards: ['ASTM F626', 'AASHTO M181'],
    specifications: {
      'Band Width': '3/4" / 7/8"',
      'Band Thickness': '11 GA / 12 GA',
      'Bolt Size': '5/16" x 1-1/4"',
      'Tensile Strength': 'Min 45,000 PSI'
    },
    isBestseller: true
  },
  {
    id: 'p4',
    name: 'Heavy Duty Tension Bars',
    description: 'Critical structural bars used to distribute tension evenly across the height of chain-link mesh. Galvanized after fabrication for maximum lifespan.',
    features: ['Deburred edges for safety', 'Extra-thick zinc coating', 'Perfectly straight vertical alignment'],
    image: '/assets/products/30.jpg',
    category: 'Structure',
    materials: ['Galvanized Steel'],
    standards: ['ASTM A123', 'ASTM F626'],
    specifications: {
      'Length Range': '3 ft to 12 ft',
      'Bar Width': '5/8" / 3/4"',
      'Bar Thickness': '3/16" / 1/4"',
      'Coating Mass': '610 g/m²'
    }
  },
  {
    id: 'p5',
    name: 'Boulevard Rail Brackets',
    description: 'Specialized clamps used to connect horizontal rails to line posts without drilling. Ideal for residential and commercial chain-link projects.',
    features: ['Two-piece bolt-together design', 'Adjustable angle capability', 'Secure slip-resistant grip'],
    image: '/assets/products/21.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron', 'Aluminum'],
    standards: ['DIN EN 10242', 'ASTM F626'],
    specifications: {
      'Post OD Compatibility': '1-5/8" to 4"',
      'Rail OD Compatibility': '1-3/8" to 1-5/8"',
      'Bolt Requirement': '2 x 5/16" x 2" Carriage',
      'Weight': '0.45 kg - 1.2 kg'
    },
    isNew: true
  },
  {
    id: 'p6',
    name: 'Custom Cast Components',
    description: 'Precision engineering and manufacturing of bespoke fencing and structural components based on proprietary customer designs.',
    features: ['In-house CAD design assistance', 'Rapid prototyping', 'High-volume production capacity'],
    image: '/assets/products/placeholder.jpg',
    category: 'Custom',
    materials: ['Iron', 'Steel', 'Aluminum', 'Brass'],
    standards: ['ISO 9001:2015 QC', 'Customer Specific'],
    specifications: {
      'Draft Angle': '1 - 3 Degrees',
      'Tolerances': '+/- 0.005"',
      'Max Part Weight': '25 kg',
      'Secondary Ops': 'Tapping, Machining, Powder Coating'
    }
  },
  {
    id: 'p7',
    name: 'Malleable Gate Hinges',
    description: 'Industrial-grade hinges designed for heavy swing gates. High load-bearing capacity with smooth pivot action.',
    features: ['Heat-treated malleable iron', 'Anti-sag design', 'Weatherproof pivot pin'],
    image: '/assets/products/41.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron'],
    standards: ['ASTM F626'],
    specifications: {
      'Load Rating': 'Up to 500 lbs/pair',
      'Post Size': '2" to 4"',
      'Bolt Size': '1/2" diameter',
      'Finish': 'Hot-Dip Galvanized'
    }
  },
  {
    id: 'p8',
    name: 'Galvanized Post Sleeves',
    description: 'Structural sleeves used for post-reinforcement or joining post sections in custom security installations.',
    features: ['Seamless tube construction', 'Extra-thick galvanizing', 'High-impact resistance'],
    image: '/assets/products/57.jpg',
    category: 'Structure',
    materials: ['Carbon Steel'],
    standards: ['ASTM A123'],
    specifications: {
      'Wall Thickness': 'Sch 40 / Sch 80',
      'Inside Diameter': 'Exact fit options',
      'Length': '6" to 24"',
      'Zinc Coating': 'ASTM A153 Class B'
    }
  },
  {
    id: 'p9',
    name: 'Cantilever Gate Rollers',
    description: 'Precision-machined rollers for heavy-duty commercial sliding gates. Ensures silent and effortless operation.',
    features: ['Sealed ball bearings', 'Graphite-impregnated nylon option', 'Rust-proof housing'],
    image: '/assets/products/42.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron', 'Nylon'],
    standards: ['ISO 9001'],
    specifications: {
      'Wheel Diameter': '4" / 6"',
      'Mounting Type': 'Internal / External',
      'Gate Weight Max': '2000 lbs',
      'Temp Range': '-40 to +180 F'
    }
  },
  {
    id: 'p10',
    name: 'Pressed Steel Floor Flanges',
    description: 'Stable mounting solutions for securing fence posts to concrete or wood surfaces without ground excavation.',
    features: ['Reinforced base plate', 'Four anchor points', 'Heavy-gauge steel'],
    image: '/assets/products/19.jpg',
    category: 'Connections',
    materials: ['Pressed Steel'],
    standards: ['ASTM F626'],
    specifications: {
      'Base Plate Size': '5" x 5"',
      'Plate Thickness': '1/4"',
      'Post OD': '1-5/8" to 2-1/2"',
      'Anchor Size': '1/2" holes'
    }
  },
  {
    id: 'p11',
    name: 'Aluminum Rail Ends',
    description: 'Lightweight yet durable connectors for horizontal rails. Provides a clean finish to residential and commercial fences.',
    features: ['Rust-proof aluminum alloy', 'Smooth rounded profile', 'Easy bolt-on installation'],
    image: '/assets/products/58.jpg',
    category: 'Hardware',
    materials: ['Aluminum'],
    standards: ['ASTM F626'],
    specifications: {
      'Rail Size': '1-3/8" / 1-5/8"',
      'Weight': '0.15 kg',
      'Finish': 'Polished / Powder Coated',
      'Mounting': 'Single carriage bolt'
    }
  },
  {
    id: 'p12',
    name: 'Line Post Eye Tops',
    description: 'The standard fitting for line posts that allows top rail to pass through smoothly while providing aesthetic closure.',
    features: ['Deep socket for rail', 'Friction-fit post mount', 'Uniform wall thickness'],
    image: '/assets/products/39.jpg',
    category: 'Hardware',
    materials: ['Pressed Steel', 'Aluminum'],
    standards: ['ASTM F626'],
    specifications: {
      'Post Size': '1-5/8" to 3"',
      'Rail Size': '1-3/8" to 1-5/8"',
      'Finish': 'Galvanized / PVC Coated',
      'Type': 'Loop Top'
    },
    isNew: true
  },
  {
    id: 'p13',
    name: 'Double Tension Bands',
    description: 'Two-sided bands for connecting mesh from both sides of a terminal post. Ensures balanced tension across corners.',
    features: ['Heavy-duty steel', 'Uniform galvanizing', 'Precisely engineered bolt holes'],
    image: '/assets/products/43.jpg',
    category: 'Connections',
    materials: ['Pressed Steel'],
    standards: ['ASTM F626']
  },
  {
    id: 'p14',
    name: 'Swivel Gate Hardware',
    description: 'Versatile pivoting components for custom gate sizes and angles.',
    features: ['Smooth rotation', 'High load capacity'],
    image: '/assets/products/22.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron']
  },
  {
    id: 'p15',
    name: 'Industrial Pipe Clamps',
    description: 'Robust clamps for secure pipe connections in structural applications.',
    features: ['High grip strength', 'Weather resistant'],
    image: '/assets/products/23.jpg',
    category: 'Connections',
    materials: ['Pressed Steel']
  },
  {
    id: 'p16',
    name: 'Offset Hinge Brackets',
    description: 'Specialized hinges for gates requiring a wider opening angle.',
    features: ['Offset design', 'Durable finish'],
    image: '/assets/products/24.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron']
  },
  {
    id: 'p17',
    name: 'Structural Brace Pins',
    description: 'Essential pins for securing horizontal braces to vertical posts.',
    features: ['Shear resistant', 'Easy installation'],
    image: '/assets/products/26.jpg',
    category: 'Hardware',
    materials: ['Hardened Steel']
  },
  {
    id: 'p18',
    name: 'Wrap-Around Gate Hinges',
    description: 'Hinges that wrap around the post for maximum security and strength.',
    features: ['360-degree support', 'Tamper-proof'],
    image: '/assets/products/27.jpg',
    category: 'Hardware',
    materials: ['Pressed Steel']
  },
  {
    id: 'p19',
    name: 'Multi-Way Rail Connectors',
    description: 'Connectors for intersecting rails at various angles.',
    features: ['Modular design', 'Zinc coated'],
    image: '/assets/products/28.jpg',
    category: 'Connections',
    materials: ['Aluminum', 'Steel']
  },
  {
    id: 'p20',
    name: 'Adjustable Wall Mounts',
    description: 'Flanges and mounts for attaching fence components to existing walls.',
    features: ['Adjustable depth', 'Four-bolt mounting'],
    image: '/assets/products/29.jpg',
    category: 'Connections',
    materials: ['Pressed Steel']
  },
  {
    id: 'p21',
    name: 'Heavy Duty L-Brackets',
    description: 'Reinforced brackets for corner support and structural stability.',
    features: ['90-degree precision', 'Reinforced gusset'],
    image: '/assets/products/33.jpg',
    category: 'Hardware',
    materials: ['Steel']
  },
  {
    id: 'p22',
    name: 'Tension Wire Clips',
    description: 'Small clips for securing bottom tension wire to fence mesh.',
    features: ['Swift application', 'High grip'],
    image: '/assets/products/34.jpg',
    category: 'Connections',
    materials: ['Galvanized Wire']
  },
  {
    id: 'p23',
    name: 'Saddle Clamps',
    description: 'Clamps designed to fit perfectly over round posts and rails.',
    features: ['Contoured fit', 'Double bolt'],
    image: '/assets/products/35.jpg',
    category: 'Connections',
    materials: ['Pressed Steel']
  },
  {
    id: 'p24',
    name: 'Gate Latches',
    description: 'Reliable gravity latches for industrial and residential gates.',
    features: ['Padlock compatible', 'Auto-locking'],
    image: '/assets/products/38.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron']
  },
  {
    id: 'p25',
    name: 'Corner Post Caps',
    description: 'Specialized caps for corner posts with integrated rail sockets.',
    features: ['Dual rail entry', 'Waterproof'],
    image: '/assets/products/40.jpg',
    category: 'Hardware',
    materials: ['Aluminum']
  },
  {
    id: 'p26',
    name: 'Standard Brace Bands',
    description: 'Standard bands for horizontal brace attachments.',
    features: ['Economic solution', 'High yield steel'],
    image: '/assets/products/49.jpg',
    category: 'Connections',
    materials: ['Pressed Steel']
  },
  {
    id: 'p27',
    name: 'Industrial Pulleys',
    description: 'Precision pulleys for automated gate systems and cable routing.',
    features: ['Smooth bearings', 'High load rating'],
    image: '/assets/products/50.jpg',
    category: 'Hardware',
    materials: ['Malleable Iron']
  },
  {
    id: 'p28',
    name: 'Heavy Duty Eye Bolts',
    description: 'Threaded bolts with eye loops for tensioning and cable anchoring.',
    features: ['Forged strength', 'Deep threads'],
    image: '/assets/products/51.jpg',
    category: 'Connections',
    materials: ['Drop Forged Steel']
  },
  {
    id: 'p29',
    name: 'Post Base Sleeves',
    description: 'Protective sleeves for post bases in corrosive environments.',
    features: ['Impact resistant', 'Tight fit'],
    image: '/assets/products/52.jpg',
    category: 'Structure',
    materials: ['PVC', 'Steel']
  },
  {
    id: 'p30',
    name: 'Rail End Closures',
    description: 'Caps and plugs for finishing raw rail ends.',
    features: ['External and Internal fit', 'Rust proof'],
    image: '/assets/products/53.jpg',
    category: 'Hardware',
    materials: ['Aluminum']
  },
  {
    id: 'p31',
    name: 'Industrial Swing Gate Kits',
    description: 'Complete hardware sets for constructing heavy-duty industrial gates.',
    features: ['All-in-one package', 'ASTM compliant'],
    image: '/assets/products/54.jpg',
    category: 'Hardware',
    materials: ['Steel', 'Iron']
  },
  {
    id: 'p32',
    name: 'Concertina Coil Supports',
    description: 'Brackets designed specifically for high-security razor wire coils.',
    features: ['Extra reinforcement', 'Sharp edge protection'],
    image: '/assets/products/55.jpg',
    category: 'Security Fencing',
    materials: ['Pressed Steel']
  }
];

export const MARKETS: Market[] = [
  { name: 'USA', icon: 'fa-flag-usa' },
  { name: 'Middle East', icon: 'fa-mosque' },
  { name: 'Europe', icon: 'fa-euro-sign' },
  { name: 'Africa', icon: 'fa-globe-africa' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'David Richardson',
    role: 'Supply Chain Manager',
    company: 'North American Fence Dist.',
    content: "Charu Enterprises has been our primary source for pressed steel fittings for over 15 years. Their consistency in gauge thickness and galvanizing quality is unmatched in the Indian market.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'Ahmed Al-Sayed',
    role: 'Procurement Specialist',
    company: 'Gulf Construction Group',
    content: "Working with Charu's export team has simplified our large-scale infrastructure projects. Their ability to customize fittings based on our technical drawings is exceptional.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Sophie Müller',
    role: 'Project Director',
    company: 'EuroGuard Systems',
    content: "The level of precision in their fence caps and bands is impressive. They understand the stringent requirements of the European market perfectly.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

export const AWARDS: Award[] = [
  {
    id: 'a1',
    title: 'Star Performer - Export Excellence',
    year: '2023',
    organization: 'EEPC India',
    description: 'Recognized for outstanding export performance in the engineering goods category for the third consecutive year.',
    icon: 'fa-star',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a2',
    title: 'National Quality Leadership Award',
    year: '2021',
    organization: 'National Quality Council',
    description: 'Awarded for maintaining world-class standards in heavy fabrication and zinc galvanizing processes.',
    icon: 'fa-award',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a3',
    title: 'Best SME Exporter (Engineering)',
    year: '2019',
    organization: 'Ministry of Commerce, India',
    description: 'A prestigious government recognition for scaling Indian engineering products to global markets.',
    icon: 'fa-trophy',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a4',
    title: 'Safety Excellence in Manufacturing',
    year: '2018',
    organization: 'Industrial Safety Forum',
    description: 'Honored for zero-incident operations at our West Bengal manufacturing facility over a 5-year period.',
    icon: 'fa-shield-heart',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Understanding ASTM F626: The Standard for Fence Fittings',
    excerpt: 'Deep dive into the technical specifications that govern the American market and why Charu’s components exceed these benchmarks.',
    date: 'March 15, 2024',
    readTime: '6 min read',
    category: 'Technical Standards',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'The Future of Zinc Galvanizing in Sustainable Manufacturing',
    excerpt: 'How we reduced carbon emissions at our West Bengal plant by 22% while maintaining superior corrosion resistance.',
    date: 'February 28, 2024',
    readTime: '4 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    title: 'Global Trade Logistics: Navigating Port Delays in 2024',
    excerpt: 'Expert advice for B2B procurement managers on optimizing container logistics during the current global supply chain shifts.',
    date: 'January 10, 2024',
    readTime: '8 min read',
    category: 'Supply Chain',
    image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=800'
  }
];
