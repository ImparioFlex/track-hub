export type VendorCategory = 'announcer' | 'timing' | 'photographer' | 'official'

export interface VendorReview {
  author: string
  rating: number
  date: string
  text: string
}

export interface Vendor {
  id: string
  name: string
  category: VendorCategory
  categoryLabel: string
  photo: string
  location: string
  distance: string
  rating: number
  reviewCount: number
  reviews: VendorReview[]
  rate: string
  rateUnit: string
  bio: string
  specialties: string[]
  certifications: string[]
  yearsExperience: number
  willTravel: string
  responseTime: string
  available: boolean
  availableDates?: string
  hired?: boolean
}

// Generate consistent avatar URLs using UI Avatars
const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=8b2c1a&color=fff&bold=true`

export const vendors: Vendor[] = [
  // Announcers
  {
    id: 'an1',
    name: 'Marcus Washington',
    category: 'announcer',
    categoryLabel: 'Announcer',
    photo: avatar('Marcus Washington'),
    location: 'Houston, TX',
    distance: '165 mi',
    rating: 4.9,
    reviewCount: 47,
    reviews: [
      { author: 'Coach Rivera, San Marcos HS', rating: 5, date: 'Mar 2026', text: 'Marcus is the gold standard. Keeps the crowd engaged, knows every athlete\'s name, and handles schedule changes on the fly without missing a beat.' },
      { author: 'Amy Chen, Meet Director', rating: 5, date: 'Feb 2026', text: 'Third year booking Marcus. Parents love him, coaches respect him. Worth every penny of the travel.' },
      { author: 'David Park, Austin Relays', rating: 5, date: 'Jan 2026', text: 'Professional, reliable, and genuinely passionate about the sport. Made our meet feel like a championship.' },
    ],
    rate: '$500',
    rateUnit: '/day',
    bio: 'Known as "The Voice of Texas Track." 12 years of experience announcing meets from local invitationals to USATF championships. Clear, energetic delivery with deep knowledge of the sport.',
    specialties: ['Track & Field', 'Cross Country', 'Road Races', 'Bilingual (English/Spanish)'],
    certifications: ['USATF Certified Announcer'],
    yearsExperience: 12,
    willTravel: 'Up to 200 mi',
    responseTime: 'Within 2 hours',
    available: true,
    hired: true,
  },
  {
    id: 'an2',
    name: 'Jennifer Chen',
    category: 'announcer',
    categoryLabel: 'Announcer',
    photo: avatar('Jennifer Chen'),
    location: 'Austin, TX',
    distance: '32 mi',
    rating: 4.7,
    reviewCount: 32,
    reviews: [
      { author: 'Tom Harris, Cedar Park', rating: 5, date: 'Mar 2026', text: 'Jennifer brings incredible energy. She researched our athletes beforehand and called out PRs as they happened. Parents were thrilled.' },
      { author: 'Lisa Wong, Dripping Springs', rating: 4, date: 'Feb 2026', text: 'Great announcer, very professional. Only ding is she sometimes talks over the starter — but she was receptive when we mentioned it.' },
    ],
    rate: '$400',
    rateUnit: '/day',
    bio: 'Former Division I track athlete turned broadcaster. Combines technical sport knowledge with engaging storytelling. Specializes in creating an exciting atmosphere for high school meets.',
    specialties: ['Track & Field', 'Indoor Meets', 'Championship Events'],
    certifications: ['USATF Certified Announcer', 'NFHS Certified'],
    yearsExperience: 6,
    willTravel: 'Up to 100 mi',
    responseTime: 'Within 4 hours',
    available: true,
  },
  {
    id: 'an3',
    name: 'David "Big Dave" Thompson',
    category: 'announcer',
    categoryLabel: 'Announcer',
    photo: avatar('David Thompson'),
    location: 'San Antonio, TX',
    distance: '48 mi',
    rating: 4.8,
    reviewCount: 55,
    reviews: [
      { author: 'Robert Kim, USATF', rating: 5, date: 'Mar 2026', text: 'Big Dave is a crowd favorite. The kids love him, the parents love him, and he keeps the meet running smooth from the booth.' },
      { author: 'Maria Santos, San Marcos', rating: 5, date: 'Jan 2026', text: 'We\'ve used Dave for 5 years running. He knows our athletes by name. That personal touch makes all the difference.' },
    ],
    rate: '$450',
    rateUnit: '/day',
    bio: 'San Antonio\'s most beloved track announcer. Known for personal connections with athletes and families. Makes every competitor feel like a champion at the mic.',
    specialties: ['Track & Field', 'Cross Country', 'Youth Development Meets'],
    certifications: ['USATF Certified Announcer'],
    yearsExperience: 15,
    willTravel: 'Up to 200 mi',
    responseTime: 'Within 1 hour',
    available: true,
  },
  // Timing Companies
  {
    id: 'tm1',
    name: 'Lone Star Timing',
    category: 'timing',
    categoryLabel: 'Timing Company',
    photo: avatar('Lone Star'),
    location: 'Dallas, TX',
    distance: '195 mi',
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      { author: 'State Meet Committee', rating: 5, date: 'Mar 2026', text: 'Flawless execution at the regional qualifier. FAT system, live results publishing, zero issues all day.' },
      { author: 'Coach Rivera, San Marcos', rating: 5, date: 'Feb 2026', text: 'Results posted within 60 seconds of each race finish. That\'s the standard everyone else should aspire to.' },
    ],
    rate: '$1,200',
    rateUnit: '/meet',
    bio: 'Texas\' premier fully automatic timing company. FAT systems with photo finish for all running events. Live results streaming to Athletic.net and AthleticLIVE. Serving Texas since 2011.',
    specialties: ['FAT Timing', 'Photo Finish', 'Live Results', 'FinishLynx', 'TFRRS Integration'],
    certifications: ['USATF Certified', 'FinishLynx Authorized'],
    yearsExperience: 15,
    willTravel: 'Statewide',
    responseTime: 'Within 24 hours',
    available: true,
    hired: true,
  },
  {
    id: 'tm2',
    name: 'Gulf Coast Timing Solutions',
    category: 'timing',
    categoryLabel: 'Timing Company',
    photo: avatar('Gulf Coast'),
    location: 'Houston, TX',
    distance: '165 mi',
    rating: 4.6,
    reviewCount: 41,
    reviews: [
      { author: 'Jessica Park, Meet Director', rating: 5, date: 'Feb 2026', text: 'Reliable, professional, and their results upload speed has improved significantly. Great value.' },
      { author: 'Coach Williams, LBJ', rating: 4, date: 'Jan 2026', text: 'Good timing, fair price. Had a minor hiccup with the photo finish on hurdles but they resolved it quickly.' },
    ],
    rate: '$950',
    rateUnit: '/meet',
    bio: 'Full-service timing with FAT and photo finish capabilities. Competitive pricing without sacrificing quality. Live results to Athletic.net within 2 minutes.',
    specialties: ['FAT Timing', 'Photo Finish', 'Live Results', 'Cross Country'],
    certifications: ['USATF Certified'],
    yearsExperience: 8,
    willTravel: 'Up to 200 mi',
    responseTime: 'Within 12 hours',
    available: true,
  },
  {
    id: 'tm3',
    name: 'TexasTime Athletics',
    category: 'timing',
    categoryLabel: 'Timing Company',
    photo: avatar('TexasTime'),
    location: 'San Marcos, TX',
    distance: 'Local',
    rating: 4.5,
    reviewCount: 23,
    reviews: [
      { author: 'Local Track Club', rating: 5, date: 'Mar 2026', text: 'Great for local meets. Quick setup, friendly crew, and they know our facility inside and out.' },
      { author: 'Coach Adams, Hays', rating: 4, date: 'Feb 2026', text: 'Solid timing, great price, especially for mid-week dual meets. Not as feature-rich as the bigger companies but gets the job done well.' },
    ],
    rate: '$800',
    rateUnit: '/meet',
    bio: 'San Marcos-based timing company. Local expertise means faster setup and lower travel costs. FAT system with live results. Perfect for invitationals, dual meets, and league championships.',
    specialties: ['FAT Timing', 'Live Results', 'Local Events'],
    certifications: ['USATF Certified'],
    yearsExperience: 5,
    willTravel: 'Up to 75 mi',
    responseTime: 'Within 6 hours',
    available: true,
  },
  // Photographers
  {
    id: 'ph1',
    name: 'Sarah Mitchell Sports Photography',
    category: 'photographer',
    categoryLabel: 'Photographer',
    photo: avatar('Sarah Mitchell'),
    location: 'Austin, TX',
    distance: '32 mi',
    rating: 4.8,
    reviewCount: 67,
    reviews: [
      { author: 'Parent - Westlake HS', rating: 5, date: 'Mar 2026', text: 'Sarah captured the exact moment my daughter crossed the finish line with her arms up. That photo is framed on our wall. Worth every cent.' },
      { author: 'Coach Rivera', rating: 5, date: 'Feb 2026', text: 'Best action shots in the business. She knows where to position herself for the perfect angle on every event.' },
    ],
    rate: '$600',
    rateUnit: '/day',
    bio: 'Specializing in youth and high school track & field for 9 years. Captures the emotion, determination, and triumph of every athlete. Same-day digital gallery delivery. Individual and team packages available.',
    specialties: ['Action Photography', 'Track & Field', 'Same-Day Delivery', 'Team Photos', 'Award Ceremonies'],
    certifications: ['PPA Certified'],
    yearsExperience: 9,
    willTravel: 'Up to 150 mi',
    responseTime: 'Within 4 hours',
    available: true,
    hired: true,
  },
  {
    id: 'ph2',
    name: 'FastFrame Athletics',
    category: 'photographer',
    categoryLabel: 'Photographer',
    photo: avatar('FastFrame'),
    location: 'San Antonio, TX',
    distance: '48 mi',
    rating: 4.6,
    reviewCount: 28,
    reviews: [
      { author: 'Meet Director, Alamo Invitational', rating: 5, date: 'Feb 2026', text: 'Photos were up on the gallery before athletes even left the venue. Incredible turnaround.' },
      { author: 'Parent - New Braunfels', rating: 4, date: 'Jan 2026', text: 'Good quality, fast delivery. Would have liked more field event coverage but the track shots were excellent.' },
    ],
    rate: '$450',
    rateUnit: '/day',
    bio: 'Speed meets quality. Known for same-day photo delivery — often within hours of each event. Dual photographer setup covers both track and field simultaneously.',
    specialties: ['Same-Day Delivery', 'Dual Coverage', 'Digital Galleries', 'Social Media Ready'],
    certifications: [],
    yearsExperience: 4,
    willTravel: 'Up to 100 mi',
    responseTime: 'Within 2 hours',
    available: true,
  },
  {
    id: 'ph3',
    name: 'TrackLens Media',
    category: 'photographer',
    categoryLabel: 'Photographer / Videographer',
    photo: avatar('TrackLens'),
    location: 'Houston, TX',
    distance: '165 mi',
    rating: 4.9,
    reviewCount: 52,
    reviews: [
      { author: 'USATF Texas', rating: 5, date: 'Mar 2026', text: 'TrackLens produced our championship highlight reel. Broadcast quality. They\'re our go-to for any event we want documented at the highest level.' },
      { author: 'Coach Adams, Regional Meet', rating: 5, date: 'Feb 2026', text: 'Photo AND video in one package. The slow-motion finish line footage is something the kids will remember forever.' },
    ],
    rate: '$750',
    rateUnit: '/day',
    bio: 'Full photo + video coverage. 4K slow-motion finish line cameras, drone aerials, and cinematic highlight reels. The premium option for meets that want broadcast-quality documentation.',
    specialties: ['Photography', '4K Video', 'Slow-Motion', 'Drone Aerials', 'Highlight Reels', 'Live Streaming'],
    certifications: ['FAA Part 107 (Drone)'],
    yearsExperience: 7,
    willTravel: 'Statewide',
    responseTime: 'Within 6 hours',
    available: false,
    availableDates: 'Next available: April 19',
  },
]
