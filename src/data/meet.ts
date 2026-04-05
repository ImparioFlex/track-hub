export type EventStatus = 'upcoming' | 'in-progress' | 'delayed' | 'completed' | 'cancelled'

export interface MeetEvent {
  id: string
  name: string
  shortName: string
  time: string
  estimatedTime?: string
  location: string
  type: 'track' | 'field'
  status: EventStatus
  heatCount?: number
  currentHeat?: number
  results?: { place: number; athlete: string; team: string; mark: string }[]
  notes?: string
}

export interface Meet {
  id: string
  name: string
  date: string
  venue: string
  address: string
  city: string
  state: string
  gatesOpen: string
  firstEvent: string
  lastEvent: string
  teamCount: number
  athleteCount: number
  eventCount: number
  weather: {
    temp: string
    condition: string
    wind: string
    humidity: string
    alert?: {
      type: 'lightning' | 'heat' | 'wind' | 'rain'
      message: string
      since: string
      estimatedResume?: string
      details: string
    }
  }
}

export const meet: Meet = {
  id: 'ctr-2026',
  name: 'Central Texas Relays',
  date: 'Saturday, April 12, 2026',
  venue: 'Bobcat Stadium Track Complex',
  address: '1100 Aquarena Springs Dr',
  city: 'San Marcos',
  state: 'TX',
  gatesOpen: '6:30 AM',
  firstEvent: '8:00 AM',
  lastEvent: '4:30 PM',
  teamCount: 18,
  athleteCount: 342,
  eventCount: 22,
  weather: {
    temp: '78°F',
    condition: 'Partly Cloudy',
    wind: 'S 12 mph, gusts to 18',
    humidity: '62%',
    alert: {
      type: 'lightning',
      message: 'Lightning detected 6.2 miles from venue',
      since: '10:42 AM',
      estimatedResume: '11:15 AM',
      details: 'Lightning strike detected 6.2 mi SW of venue at 10:42 AM. Per NFHS policy, all outdoor activity suspended for minimum 30 minutes from last detected strike. Athletes and spectators should seek shelter in permanent structures or vehicles. Do NOT shelter under tents, trees, or metal bleachers.',
    },
  },
}

export const events: MeetEvent[] = [
  // Field events (8:00 AM start)
  {
    id: 'hj-g',
    name: 'Girls High Jump',
    shortName: 'HJ (G)',
    time: '8:00 AM',
    location: 'High Jump Apron - North',
    type: 'field',
    status: 'completed',
    results: [
      { place: 1, athlete: 'Aaliyah Brooks', team: 'Austin Westlake', mark: "5'4\"" },
      { place: 2, athlete: 'Sofia Martinez', team: 'San Marcos HS', mark: "5'2\"" },
      { place: 3, athlete: 'Jordan Lee', team: 'Dripping Springs', mark: "5'0\"" },
    ],
  },
  {
    id: 'sp-b',
    name: 'Boys Shot Put',
    shortName: 'SP (B)',
    time: '8:00 AM',
    location: 'Throws Area - South Lot',
    type: 'field',
    status: 'completed',
    results: [
      { place: 1, athlete: 'Marcus Williams', team: 'Hays HS', mark: "52'3\"" },
      { place: 2, athlete: 'DeShawn Carter', team: 'Austin LBJ', mark: "49'8\"" },
      { place: 3, athlete: 'Tyler Novak', team: 'New Braunfels', mark: "48'1\"" },
    ],
  },
  {
    id: 'lj-g',
    name: 'Girls Long Jump',
    shortName: 'LJ (G)',
    time: '8:30 AM',
    location: 'Long Jump Pit - East',
    type: 'field',
    status: 'completed',
    results: [
      { place: 1, athlete: 'Emma Rodriguez', team: 'Hays HS', mark: "17'8\"" },
      { place: 2, athlete: 'Destiny Johnson', team: 'Austin Bowie', mark: "17'2\"" },
      { place: 3, athlete: 'Maya Chen', team: 'Cedar Park', mark: "16'11\"" },
    ],
  },
  {
    id: 'pv-b',
    name: 'Boys Pole Vault',
    shortName: 'PV (B)',
    time: '8:30 AM',
    location: 'Pole Vault Runway - West',
    type: 'field',
    status: 'in-progress',
    notes: 'Bar at 13\'6" — 4 athletes remaining',
  },
  {
    id: 'dt-g',
    name: 'Girls Discus',
    shortName: 'DT (G)',
    time: '9:30 AM',
    location: 'Throws Area - South Lot',
    type: 'field',
    status: 'delayed',
    estimatedTime: '11:15 AM',
    notes: 'Delayed due to weather hold',
  },
  {
    id: 'tj-b',
    name: 'Boys Triple Jump',
    shortName: 'TJ (B)',
    time: '10:00 AM',
    location: 'Long Jump Pit - East',
    type: 'field',
    status: 'delayed',
    estimatedTime: '11:30 AM',
    notes: 'Delayed due to weather hold',
  },
  // Track events
  {
    id: '100g',
    name: 'Girls 100m',
    shortName: '100m (G)',
    time: '9:00 AM',
    location: 'Main Track',
    type: 'track',
    status: 'completed',
    heatCount: 4,
    results: [
      { place: 1, athlete: 'Kayla Thomas', team: 'Austin Westlake', mark: '11.89' },
      { place: 2, athlete: 'Brianna Davis', team: 'Cedar Park', mark: '12.03' },
      { place: 3, athlete: 'Zoe Mitchell', team: 'Hays HS', mark: '12.15' },
    ],
  },
  {
    id: '100b',
    name: 'Boys 100m',
    shortName: '100m (B)',
    time: '9:15 AM',
    location: 'Main Track',
    type: 'track',
    status: 'completed',
    heatCount: 5,
    results: [
      { place: 1, athlete: 'Jaylen Harris', team: 'Austin LBJ', mark: '10.52' },
      { place: 2, athlete: 'Chris Morales', team: 'San Marcos HS', mark: '10.71' },
      { place: 3, athlete: 'Andre Williams', team: 'Dripping Springs', mark: '10.83' },
    ],
  },
  {
    id: '400g',
    name: 'Girls 400m',
    shortName: '400m (G)',
    time: '9:30 AM',
    location: 'Main Track',
    type: 'track',
    status: 'completed',
    heatCount: 3,
    results: [
      { place: 1, athlete: 'Emma Rodriguez', team: 'Hays HS', mark: '56.42' },
      { place: 2, athlete: 'Nia Jackson', team: 'Austin Bowie', mark: '57.18' },
      { place: 3, athlete: 'Isabella Reyes', team: 'New Braunfels', mark: '57.94' },
    ],
  },
  {
    id: '400b',
    name: 'Boys 400m',
    shortName: '400m (B)',
    time: '9:45 AM',
    location: 'Main Track',
    type: 'track',
    status: 'completed',
    heatCount: 4,
    results: [
      { place: 1, athlete: 'Darius Moore', team: 'Hays HS', mark: '48.31' },
      { place: 2, athlete: 'Ethan Park', team: 'Cedar Park', mark: '49.02' },
      { place: 3, athlete: 'James Carter', team: 'Austin Westlake', mark: '49.67' },
    ],
  },
  {
    id: '800g',
    name: 'Girls 800m',
    shortName: '800m (G)',
    time: '10:00 AM',
    location: 'Main Track',
    type: 'track',
    status: 'completed',
    heatCount: 2,
    results: [
      { place: 1, athlete: 'Lily Thompson', team: 'Dripping Springs', mark: '2:14.56' },
      { place: 2, athlete: 'Hannah Kim', team: 'Cedar Park', mark: '2:16.22' },
      { place: 3, athlete: 'Sophia Gonzalez', team: 'San Marcos HS', mark: '2:17.89' },
    ],
  },
  {
    id: '110h',
    name: 'Boys 110m Hurdles',
    shortName: '110H (B)',
    time: '10:15 AM',
    location: 'Main Track',
    type: 'track',
    status: 'delayed',
    estimatedTime: '11:15 AM',
    heatCount: 3,
    notes: 'First event after weather hold clears',
  },
  {
    id: '100h',
    name: 'Girls 100m Hurdles',
    shortName: '100H (G)',
    time: '10:30 AM',
    location: 'Main Track',
    type: 'track',
    status: 'delayed',
    estimatedTime: '11:30 AM',
    heatCount: 3,
  },
  {
    id: '200g',
    name: 'Girls 200m',
    shortName: '200m (G)',
    time: '11:00 AM',
    location: 'Main Track',
    type: 'track',
    status: 'delayed',
    estimatedTime: '11:45 AM',
    heatCount: 4,
  },
  {
    id: '200b',
    name: 'Boys 200m',
    shortName: '200m (B)',
    time: '11:15 AM',
    location: 'Main Track',
    type: 'track',
    status: 'delayed',
    estimatedTime: '12:00 PM',
    heatCount: 5,
  },
  {
    id: '1600g',
    name: 'Girls 1600m',
    shortName: '1600m (G)',
    time: '11:30 AM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 2,
  },
  {
    id: '1600b',
    name: 'Boys 1600m',
    shortName: '1600m (B)',
    time: '11:45 AM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 2,
  },
  {
    id: '4x1g',
    name: 'Girls 4x100m Relay',
    shortName: '4x100 (G)',
    time: '1:00 PM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 3,
  },
  {
    id: '4x1b',
    name: 'Boys 4x100m Relay',
    shortName: '4x100 (B)',
    time: '1:15 PM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 3,
  },
  {
    id: '3200g',
    name: 'Girls 3200m',
    shortName: '3200m (G)',
    time: '2:00 PM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 1,
  },
  {
    id: '4x4g',
    name: 'Girls 4x400m Relay',
    shortName: '4x400 (G)',
    time: '3:30 PM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 3,
  },
  {
    id: '4x4b',
    name: 'Boys 4x400m Relay',
    shortName: '4x400 (B)',
    time: '4:00 PM',
    location: 'Main Track',
    type: 'track',
    status: 'upcoming',
    heatCount: 3,
  },
]

// Parent is following Emma Rodriguez from Hays HS
export const followedAthlete = {
  name: 'Emma Rodriguez',
  team: 'Hays HS',
  grade: '11th',
  events: ['lj-g', '400g', '200g'],
  prs: {
    'lj-g': "17'10\"",
    '400g': '55.89',
    '200g': '25.12',
  },
  seasonBests: {
    'lj-g': "17'8\"",
    '400g': '56.42',
    '200g': '—',
  },
}

export const teams = [
  'Austin Westlake', 'Hays HS', 'San Marcos HS', 'Cedar Park', 'Dripping Springs',
  'Austin LBJ', 'Austin Bowie', 'New Braunfels', 'Lehman HS', 'Wimberley',
  'Lockhart', 'Georgetown', 'Pflugerville', 'Round Rock', 'Stony Point',
  'Vandegrift', 'Lake Travis', 'Del Valle',
]
