export type StaffRole =
  | 'meet-director'
  | 'assistant-director'
  | 'head-starter'
  | 'starter'
  | 'head-field-judge'
  | 'field-judge'
  | 'finish-line'
  | 'medical'
  | 'announcer'
  | 'timing'
  | 'athletic-trainer'

export interface StaffMember {
  id: string
  name: string
  role: StaffRole
  roleLabel: string
  phone: string
  email: string
  certification?: string
  checkedIn: boolean
  checkedInTime?: string
  notes?: string
}

export const staff: StaffMember[] = [
  {
    id: 's1',
    name: 'Coach Alex Rivera',
    role: 'meet-director',
    roleLabel: 'Meet Director',
    phone: '(512) 555-0101',
    email: 'arivera@sanmarcoscisd.net',
    checkedIn: true,
    checkedInTime: '5:45 AM',
    notes: 'On-site lead. Final authority on all meet decisions.',
  },
  {
    id: 's2',
    name: 'Maria Santos',
    role: 'assistant-director',
    roleLabel: 'Assistant Director',
    phone: '(512) 555-0102',
    email: 'msantos@sanmarcoscisd.net',
    checkedIn: true,
    checkedInTime: '5:52 AM',
    notes: 'Manages volunteer coordination and parent communications.',
  },
  {
    id: 's3',
    name: 'James Mitchell',
    role: 'head-starter',
    roleLabel: 'Head Starter',
    phone: '(512) 555-0103',
    email: 'jmitchell.usatf@gmail.com',
    certification: 'USATF Level 2',
    checkedIn: true,
    checkedInTime: '6:30 AM',
  },
  {
    id: 's4',
    name: 'Robert Kim',
    role: 'starter',
    roleLabel: 'Starter',
    phone: '(512) 555-0104',
    email: 'rkim.track@gmail.com',
    certification: 'USATF Level 1',
    checkedIn: true,
    checkedInTime: '6:45 AM',
  },
  {
    id: 's5',
    name: 'Patricia Wong',
    role: 'head-field-judge',
    roleLabel: 'Head Field Judge',
    phone: '(512) 555-0105',
    email: 'pwong.official@gmail.com',
    certification: 'USATF Level 2',
    checkedIn: true,
    checkedInTime: '6:20 AM',
  },
  {
    id: 's6',
    name: 'Dr. Sarah Kim',
    role: 'medical',
    roleLabel: 'Medical Director',
    phone: '(512) 555-0106',
    email: 'drsarahkim@txhealth.com',
    certification: 'MD, Sports Medicine',
    checkedIn: true,
    checkedInTime: '6:15 AM',
    notes: 'AED located at medical tent, near finish line.',
  },
  {
    id: 's7',
    name: 'Jake Torres',
    role: 'athletic-trainer',
    roleLabel: 'Athletic Trainer',
    phone: '(512) 555-0107',
    email: 'jtorres@rehab.com',
    certification: 'ATC, LAT',
    checkedIn: true,
    checkedInTime: '6:30 AM',
  },
  {
    id: 's8',
    name: 'Lisa Park',
    role: 'athletic-trainer',
    roleLabel: 'Athletic Trainer',
    phone: '(512) 555-0108',
    email: 'lpark@rehab.com',
    certification: 'ATC, LAT',
    checkedIn: false,
    notes: 'Expected by 7:00 AM — covering throws area',
  },
  {
    id: 's9',
    name: 'Marcus Washington',
    role: 'announcer',
    roleLabel: 'Announcer',
    phone: '(713) 555-0201',
    email: 'marcus@voiceoftexastrack.com',
    certification: 'USATF Certified',
    checkedIn: true,
    checkedInTime: '6:00 AM',
    notes: 'PA system tested and operational. Backup wireless mic in announcer booth.',
  },
]

export type VolunteerRole =
  | 'registration'
  | 'field-lj-tj'
  | 'field-throws'
  | 'field-verticals'
  | 'finish-line'
  | 'water-station'
  | 'parking'
  | 'awards'
  | 'runner-courier'

export interface Volunteer {
  id: string
  name: string
  role: VolunteerRole
  roleLabel: string
  location: string
  shiftStart: string
  shiftEnd: string
  checkedIn: boolean
  checkedInTime?: string
  phone: string
  notes?: string
}

export const volunteers: Volunteer[] = [
  // Registration (4)
  { id: 'v1', name: 'Angela Martinez', role: 'registration', roleLabel: 'Registration', location: 'Main Gate', shiftStart: '6:00 AM', shiftEnd: '10:00 AM', checkedIn: true, checkedInTime: '5:55 AM', phone: '(512) 555-1001' },
  { id: 'v2', name: 'David Chen', role: 'registration', roleLabel: 'Registration', location: 'Main Gate', shiftStart: '6:00 AM', shiftEnd: '10:00 AM', checkedIn: true, checkedInTime: '6:02 AM', phone: '(512) 555-1002' },
  { id: 'v3', name: 'Karen Williams', role: 'registration', roleLabel: 'Registration', location: 'Main Gate', shiftStart: '9:30 AM', shiftEnd: '1:30 PM', checkedIn: false, phone: '(512) 555-1003', notes: 'Second shift — not due yet' },
  { id: 'v4', name: 'Tom Nguyen', role: 'registration', roleLabel: 'Registration', location: 'Main Gate', shiftStart: '9:30 AM', shiftEnd: '1:30 PM', checkedIn: false, phone: '(512) 555-1004', notes: 'Second shift — not due yet' },
  // Field - LJ/TJ (3)
  { id: 'v5', name: 'Rachel Foster', role: 'field-lj-tj', roleLabel: 'Long Jump / Triple Jump', location: 'Jump Pit - East', shiftStart: '7:00 AM', shiftEnd: '12:00 PM', checkedIn: true, checkedInTime: '6:48 AM', phone: '(512) 555-1005' },
  { id: 'v6', name: 'Mike Johnson', role: 'field-lj-tj', roleLabel: 'Long Jump / Triple Jump', location: 'Jump Pit - East', shiftStart: '7:00 AM', shiftEnd: '12:00 PM', checkedIn: true, checkedInTime: '7:01 AM', phone: '(512) 555-1006' },
  { id: 'v7', name: 'Sarah Lopez', role: 'field-lj-tj', roleLabel: 'Long Jump / Triple Jump', location: 'Jump Pit - East', shiftStart: '11:30 AM', shiftEnd: '4:30 PM', checkedIn: false, phone: '(512) 555-1007', notes: 'Second shift — not due yet' },
  // Field - Throws (3)
  { id: 'v8', name: 'Brian Taylor', role: 'field-throws', roleLabel: 'Throws', location: 'Throws Area - South Lot', shiftStart: '7:00 AM', shiftEnd: '12:00 PM', checkedIn: true, checkedInTime: '6:55 AM', phone: '(512) 555-1008' },
  { id: 'v9', name: 'Lisa Hernandez', role: 'field-throws', roleLabel: 'Throws', location: 'Throws Area - South Lot', shiftStart: '7:00 AM', shiftEnd: '12:00 PM', checkedIn: true, checkedInTime: '7:10 AM', phone: '(512) 555-1009' },
  { id: 'v10', name: 'Chris Brown', role: 'field-throws', roleLabel: 'Throws', location: 'Throws Area - South Lot', shiftStart: '11:30 AM', shiftEnd: '4:30 PM', checkedIn: false, phone: '(512) 555-1010', notes: 'Second shift — not due yet' },
  // Field - Verticals (2)
  { id: 'v11', name: 'Amy Watkins', role: 'field-verticals', roleLabel: 'High Jump / Pole Vault', location: 'HJ Apron & PV Runway', shiftStart: '7:00 AM', shiftEnd: '2:00 PM', checkedIn: true, checkedInTime: '6:50 AM', phone: '(512) 555-1011' },
  { id: 'v12', name: 'Derek Mitchell', role: 'field-verticals', roleLabel: 'High Jump / Pole Vault', location: 'HJ Apron & PV Runway', shiftStart: '7:00 AM', shiftEnd: '2:00 PM', checkedIn: false, phone: '(512) 555-1012', notes: '⚠️ 20 min late — no response to text' },
  // Finish Line (4)
  { id: 'v13', name: 'Jennifer Adams', role: 'finish-line', roleLabel: 'Finish Line', location: 'Finish Line Area', shiftStart: '8:00 AM', shiftEnd: '1:00 PM', checkedIn: true, checkedInTime: '7:45 AM', phone: '(512) 555-1013' },
  { id: 'v14', name: 'Paul Garcia', role: 'finish-line', roleLabel: 'Finish Line', location: 'Finish Line Area', shiftStart: '8:00 AM', shiftEnd: '1:00 PM', checkedIn: true, checkedInTime: '7:50 AM', phone: '(512) 555-1014' },
  { id: 'v15', name: 'Samantha Lee', role: 'finish-line', roleLabel: 'Finish Line', location: 'Finish Line Area', shiftStart: '12:30 PM', shiftEnd: '5:00 PM', checkedIn: false, phone: '(512) 555-1015', notes: 'Second shift — not due yet' },
  { id: 'v16', name: 'Kevin Wright', role: 'finish-line', roleLabel: 'Finish Line', location: 'Finish Line Area', shiftStart: '12:30 PM', shiftEnd: '5:00 PM', checkedIn: false, phone: '(512) 555-1016', notes: 'Second shift — not due yet' },
  // Water Station (2)
  { id: 'v17', name: 'Maria Flores', role: 'water-station', roleLabel: 'Water Station', location: 'Water Station - Turn 2', shiftStart: '7:30 AM', shiftEnd: '12:30 PM', checkedIn: true, checkedInTime: '7:28 AM', phone: '(512) 555-1017' },
  { id: 'v18', name: 'Joe Patterson', role: 'water-station', roleLabel: 'Water Station', location: 'Water Station - Turn 2', shiftStart: '12:00 PM', shiftEnd: '5:00 PM', checkedIn: false, phone: '(512) 555-1018', notes: 'Second shift — not due yet' },
  // Parking (2)
  { id: 'v19', name: 'Steve Kowalski', role: 'parking', roleLabel: 'Parking', location: 'Lot A - Main Entrance', shiftStart: '5:30 AM', shiftEnd: '10:30 AM', checkedIn: true, checkedInTime: '5:25 AM', phone: '(512) 555-1019' },
  { id: 'v20', name: 'Diana Ruiz', role: 'parking', roleLabel: 'Parking', location: 'Lot B - Overflow', shiftStart: '5:30 AM', shiftEnd: '10:30 AM', checkedIn: true, checkedInTime: '5:35 AM', phone: '(512) 555-1020' },
  // Awards Table (2)
  { id: 'v21', name: 'Nancy Thompson', role: 'awards', roleLabel: 'Awards Table', location: 'Awards Area - Near Finish', shiftStart: '9:00 AM', shiftEnd: '5:00 PM', checkedIn: true, checkedInTime: '8:50 AM', phone: '(512) 555-1021' },
  { id: 'v22', name: 'Ryan Park', role: 'awards', roleLabel: 'Awards Table', location: 'Awards Area - Near Finish', shiftStart: '9:00 AM', shiftEnd: '5:00 PM', checkedIn: true, checkedInTime: '8:55 AM', phone: '(512) 555-1022' },
  // Runner/Courier (2)
  { id: 'v23', name: 'Alex Morales', role: 'runner-courier', roleLabel: 'Runner / Courier', location: 'Roaming', shiftStart: '7:00 AM', shiftEnd: '2:00 PM', checkedIn: true, checkedInTime: '6:58 AM', phone: '(512) 555-1023', notes: 'Delivers results sheets from finish line to announcer and awards' },
  { id: 'v24', name: 'Tina Brooks', role: 'runner-courier', roleLabel: 'Runner / Courier', location: 'Roaming', shiftStart: '12:00 PM', shiftEnd: '5:00 PM', checkedIn: false, phone: '(512) 555-1024', notes: 'Second shift — not due yet' },
]
