import { useState } from 'react'
import {
  LayoutDashboard,
  Map,
  Store,
  Settings,
  Activity,
  CheckSquare,
  Info,
  BarChart3,
  Megaphone,
  FileDown,
  CreditCard,
  Shield,
  SlidersHorizontal,
  Phone,
  Share2,
} from 'lucide-react'
import { RoleSwitcher, type Role } from './components/RoleSwitcher'
import { BottomNav, type NavItem } from './components/BottomNav'
import { VenueMap } from './components/VenueMap'
import { DirectorView } from './views/DirectorHome'
import { ParentView } from './views/ParentHome'
import { VolunteerView } from './views/VolunteerHome'
import { VendorView } from './views/VendorMarketplace'
import { meet } from './data/meet'
import { notifications } from './data/mapPins'

const directorNav: NavItem[] = [
  { id: 'home', label: 'Command', icon: <LayoutDashboard size={20} /> },
  { id: 'map', label: 'Map', icon: <Map size={20} /> },
  { id: 'vendors', label: 'Vendors', icon: <Store size={20} /> },
  { id: 'more', label: 'More', icon: <Settings size={20} /> },
]

const parentNav: NavItem[] = [
  { id: 'home', label: 'My Athlete', icon: <Activity size={20} />, badge: notifications.filter(n => !n.read).length },
  { id: 'map', label: 'Map', icon: <Map size={20} /> },
  { id: 'info', label: 'Info', icon: <Info size={20} /> },
]

const volunteerNav: NavItem[] = [
  { id: 'home', label: 'My Tasks', icon: <CheckSquare size={20} /> },
  { id: 'map', label: 'Map', icon: <Map size={20} /> },
  { id: 'info', label: 'Info', icon: <Info size={20} /> },
]

const vendorNav: NavItem[] = [
  { id: 'home', label: 'Marketplace', icon: <Store size={20} /> },
  { id: 'map', label: 'Map', icon: <Map size={20} /> },
]

function getNavForRole(role: Role): NavItem[] {
  switch (role) {
    case 'director': return directorNav
    case 'parent': return parentNav
    case 'volunteer': return volunteerNav
    case 'vendor': return vendorNav
  }
}

function MeetHeader({ role, onRoleChange }: { role: Role; onRoleChange: (r: Role) => void }) {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-sand-100">
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brick-700 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-black">TH</span>
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-sand-950 leading-tight">{meet.name}</h1>
              <p className="text-[12px] text-sand-500">{meet.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!meet.weather.alert ? (
              <div className="flex items-center gap-1.5 bg-sand-50 px-2.5 py-1 rounded-full">
                <span className="text-xs">{meet.weather.temp}</span>
                <span className="text-[11px] text-sand-500">{meet.weather.condition}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-[12px] font-semibold text-amber-700">Weather Hold</span>
              </div>
            )}
          </div>
        </div>
        <RoleSwitcher current={role} onChange={onRoleChange} />
      </div>
    </div>
  )
}

function MapView({ role }: { role: Role }) {
  return (
    <div className="flex flex-col h-[calc(100dvh-140px)]">
      <div className="px-4 py-3 bg-white border-b border-sand-100">
        <h2 className="text-lg font-bold text-sand-950">Venue Map</h2>
        <p className="text-[13px] text-sand-500">
          {meet.venue} · {meet.city}, {meet.state}
        </p>
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {[
            { label: 'All', cat: undefined },
            { label: 'Track', cat: 'track' },
            { label: 'Field', cat: 'field' },
            { label: 'Facilities', cat: 'facility' },
            { label: 'Medical', cat: 'medical' },
            { label: 'Parking', cat: 'parking' },
          ].map(({ label }) => (
            <button
              key={label}
              className="px-3 py-1 text-[12px] font-semibold rounded-full bg-sand-100 text-sand-700 whitespace-nowrap hover:bg-sand-200 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <VenueMap
          highlightPin={role === 'volunteer' ? 'lj-tj' : undefined}
        />
      </div>
    </div>
  )
}

interface MoreMenuItem {
  icon: React.ReactNode
  label: string
  desc: string
}

function MoreMenu() {
  const items: MoreMenuItem[] = [
    { icon: <BarChart3 size={20} />, label: 'Meet Statistics', desc: 'Attendance, results, and performance data' },
    { icon: <Megaphone size={20} />, label: 'Send Announcement', desc: 'Push notification to all attendees' },
    { icon: <FileDown size={20} />, label: 'Export Results', desc: 'Download results for Athletic.net upload' },
    { icon: <CreditCard size={20} />, label: 'Payments', desc: 'Official and vendor payment status' },
    { icon: <Shield size={20} />, label: 'Permissions', desc: 'Manage staff access levels' },
    { icon: <SlidersHorizontal size={20} />, label: 'Meet Settings', desc: 'Edit meet details, schedule, rules' },
    { icon: <Phone size={20} />, label: 'Emergency Contacts', desc: 'Quick-dial emergency numbers' },
    { icon: <Share2 size={20} />, label: 'Share Meet Link', desc: 'QR code for parents to follow along' },
  ]

  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-bold text-sand-950 mb-4">Settings & Info</h2>
      <div className="space-y-2">
        {items.map(item => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-lg bg-white border border-sand-100 hover:border-sand-200 transition-colors text-left"
          >
            <span className="text-sand-600">{item.icon}</span>
            <div>
              <div className="text-[15px] font-semibold text-sand-950">{item.label}</div>
              <div className="text-[13px] text-sand-500">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function InfoView() {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-bold text-sand-950 mb-4">Meet Information</h2>
      <div className="bg-white rounded-lg border border-sand-100 overflow-hidden">
        <div className="p-4 border-b border-sand-50">
          <h3 className="font-bold text-sand-950">{meet.name}</h3>
          <p className="text-[14px] text-sand-600 mt-0.5">{meet.venue}</p>
          <p className="text-[14px] text-sand-600">{meet.address}, {meet.city}, {meet.state}</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-sand-50">
          <div className="p-3 text-center">
            <div className="text-[11px] text-sand-500 uppercase font-medium">Gates</div>
            <div className="text-[15px] font-bold text-sand-950 mt-0.5">{meet.gatesOpen}</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-[11px] text-sand-500 uppercase font-medium">First Event</div>
            <div className="text-[15px] font-bold text-sand-950 mt-0.5">{meet.firstEvent}</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-[11px] text-sand-500 uppercase font-medium">Last Event</div>
            <div className="text-[15px] font-bold text-sand-950 mt-0.5">{meet.lastEvent}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="bg-white rounded-lg border border-sand-100 p-4">
          <h3 className="font-bold text-sand-950 mb-2">Weather</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-sand-500 uppercase">Temperature</div>
              <div className="text-[15px] font-semibold">{meet.weather.temp}</div>
            </div>
            <div>
              <div className="text-[11px] text-sand-500 uppercase">Conditions</div>
              <div className="text-[15px] font-semibold">{meet.weather.condition}</div>
            </div>
            <div>
              <div className="text-[11px] text-sand-500 uppercase">Wind</div>
              <div className="text-[15px] font-semibold">{meet.weather.wind}</div>
            </div>
            <div>
              <div className="text-[11px] text-sand-500 uppercase">Humidity</div>
              <div className="text-[15px] font-semibold">{meet.weather.humidity}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-sand-100 p-4">
          <h3 className="font-bold text-sand-950 mb-2">Quick Numbers</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-black text-brick-700">{meet.teamCount}</div>
              <div className="text-[12px] text-sand-500">Teams</div>
            </div>
            <div>
              <div className="text-2xl font-black text-brick-700">{meet.athleteCount}</div>
              <div className="text-[12px] text-sand-500">Athletes</div>
            </div>
            <div>
              <div className="text-2xl font-black text-brick-700">{meet.eventCount}</div>
              <div className="text-[12px] text-sand-500">Events</div>
            </div>
          </div>
        </div>

        <div className="bg-info-light rounded-lg p-4">
          <h3 className="font-bold text-info mb-1">Live Results</h3>
          <p className="text-[14px] text-sand-700">
            Results are posted to Athletic.net within 60 seconds of each event finishing.
            Scan the QR code at the registration table to follow along.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState<Role>('director')
  const [activeTab, setActiveTab] = useState('home')

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole)
    setActiveTab('home')
  }

  const navItems = getNavForRole(role)

  const renderContent = () => {
    if (activeTab === 'map') return <MapView role={role} />
    if (activeTab === 'more') return <MoreMenu />
    if (activeTab === 'info') return <InfoView />
    if (activeTab === 'vendors') return <VendorView />

    switch (role) {
      case 'director': return <DirectorView />
      case 'parent': return <ParentView />
      case 'volunteer': return <VolunteerView />
      case 'vendor': return <VendorView />
    }
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <MeetHeader role={role} onRoleChange={handleRoleChange} />
      <main className="flex-1 pb-20 overflow-y-auto">
        {renderContent()}
      </main>
      <BottomNav items={navItems} activeId={activeTab} onSelect={setActiveTab} />
    </div>
  )
}
