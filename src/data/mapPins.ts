export interface MapPin {
  id: string
  label: string
  description: string
  category: 'track' | 'field' | 'facility' | 'medical' | 'parking' | 'volunteer'
  lat: number
  lng: number
  color: string
}

// Texas State Bobcat Stadium Track Complex — San Marcos, TX
// Center: ~29.8884, -97.9384
export const VENUE_CENTER: [number, number] = [29.8884, -97.9384]
export const VENUE_ZOOM = 17

export const mapPins: MapPin[] = [
  // Track locations
  {
    id: 'finish',
    label: 'Finish Line',
    description: 'All running events finish here. Timing tent, photo finish camera, and results processing.',
    category: 'track',
    lat: 29.8890,
    lng: -97.9380,
    color: '#8b2c1a',
  },
  {
    id: 'start-100',
    label: '100m / 110H Start',
    description: 'Starting blocks, starter position, and recall starter.',
    category: 'track',
    lat: 29.8890,
    lng: -97.9395,
    color: '#8b2c1a',
  },
  {
    id: 'start-200',
    label: '200m / 200m Start',
    description: 'Staggered start. Blocks positioned on the curve.',
    category: 'track',
    lat: 29.8896,
    lng: -97.9393,
    color: '#8b2c1a',
  },
  {
    id: 'waterfall-800',
    label: '800m / 1600m Start',
    description: 'Waterfall start line. Break line at 100m mark.',
    category: 'track',
    lat: 29.8878,
    lng: -97.9388,
    color: '#8b2c1a',
  },
  // Field events
  {
    id: 'lj-tj',
    label: 'Long Jump / Triple Jump',
    description: 'Jump pit — east side. Runway, board, and landing pit. Currently: Girls Discus delayed.',
    category: 'field',
    lat: 29.8893,
    lng: -97.9374,
    color: '#2563eb',
  },
  {
    id: 'hj',
    label: 'High Jump',
    description: 'High jump apron — north end of infield. Standards, crossbar, and landing mat.',
    category: 'field',
    lat: 29.8895,
    lng: -97.9384,
    color: '#2563eb',
  },
  {
    id: 'pv',
    label: 'Pole Vault',
    description: 'Pole vault runway — west side. Standards, crossbar, landing pit. Currently: Boys PV in progress.',
    category: 'field',
    lat: 29.8888,
    lng: -97.9396,
    color: '#2563eb',
  },
  {
    id: 'throws',
    label: 'Throws Area',
    description: 'Shot put ring and discus cage — south parking lot. Stay behind safety line at all times.',
    category: 'field',
    lat: 29.8872,
    lng: -97.9390,
    color: '#2563eb',
  },
  // Facilities
  {
    id: 'registration',
    label: 'Registration / Check-In',
    description: 'Team check-in, hip number distribution, meet programs. Open 6:30 AM — 10:00 AM.',
    category: 'facility',
    lat: 29.8882,
    lng: -97.9370,
    color: '#15803d',
  },
  {
    id: 'announcer',
    label: 'Announcer Booth',
    description: 'PA system, meet operations center. Marcus Washington announcing.',
    category: 'facility',
    lat: 29.8889,
    lng: -97.9376,
    color: '#15803d',
  },
  {
    id: 'concessions',
    label: 'Concessions',
    description: 'Food, drinks, snacks. Water and Gatorade available. Cash and card accepted.',
    category: 'facility',
    lat: 29.8880,
    lng: -97.9372,
    color: '#15803d',
  },
  {
    id: 'restrooms',
    label: 'Restrooms',
    description: 'Main restroom building. Accessible facilities available.',
    category: 'facility',
    lat: 29.8878,
    lng: -97.9374,
    color: '#15803d',
  },
  {
    id: 'awards',
    label: 'Awards Table',
    description: 'Medals and ribbons distributed here after each event. Podium for top 3.',
    category: 'facility',
    lat: 29.8886,
    lng: -97.9374,
    color: '#15803d',
  },
  // Medical
  {
    id: 'medical',
    label: 'Medical Tent',
    description: 'Dr. Sarah Kim + 2 athletic trainers. AED on-site. For emergencies: call 911 first, then radio Channel 1.',
    category: 'medical',
    lat: 29.8888,
    lng: -97.9378,
    color: '#dc2626',
  },
  {
    id: 'water1',
    label: 'Water Station',
    description: 'Water and cups for athletes. Located at turn 2.',
    category: 'medical',
    lat: 29.8895,
    lng: -97.9390,
    color: '#dc2626',
  },
  // Parking
  {
    id: 'lot-a',
    label: 'Lot A — Teams / Buses',
    description: 'Team bus parking and team vehicle parking. Closest to track entrance.',
    category: 'parking',
    lat: 29.8876,
    lng: -97.9368,
    color: '#6b645d',
  },
  {
    id: 'lot-b',
    label: 'Lot B — Spectators',
    description: 'General spectator parking. 3-minute walk to main entrance.',
    category: 'parking',
    lat: 29.8870,
    lng: -97.9378,
    color: '#6b645d',
  },
]

export const notifications = [
  {
    id: 'n1',
    type: 'safety' as const,
    title: 'Lightning Delay',
    message: 'Lightning detected 6.2 mi from venue. All outdoor activity suspended. Seek shelter in permanent structures or vehicles.',
    time: '10:42 AM',
    read: false,
  },
  {
    id: 'n2',
    type: 'schedule' as const,
    title: 'Emma\'s 200m Delayed',
    message: 'Girls 200m moved from 11:00 AM to ~11:45 AM due to weather delay. We\'ll notify you 10 min before.',
    time: '10:45 AM',
    read: false,
  },
  {
    id: 'n3',
    type: 'result' as const,
    title: 'Emma Rodriguez — 400m Result',
    message: 'Emma finished 1st in the Girls 400m with a time of 56.42! Season best!',
    time: '9:38 AM',
    read: true,
  },
  {
    id: 'n4',
    type: 'result' as const,
    title: 'Emma Rodriguez — Long Jump Result',
    message: 'Emma finished 1st in Girls Long Jump with 17\'8"! Just 2" off her PR.',
    time: '8:52 AM',
    read: true,
  },
  {
    id: 'n5',
    type: 'schedule' as const,
    title: 'Girls 400m — Heat 2 Starting',
    message: 'Emma is in Heat 2 of Girls 400m, starting in ~5 minutes. Lane 4.',
    time: '9:28 AM',
    read: true,
  },
  {
    id: 'n6',
    type: 'info' as const,
    title: 'Welcome to Central Texas Relays',
    message: 'Gates are open! Check the schedule tab for today\'s events. Live results will be posted as events complete.',
    time: '7:30 AM',
    read: true,
  },
]
