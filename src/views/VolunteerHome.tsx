import { useState } from 'react'
import { volunteers } from '../data/staff'
import { events, meet } from '../data/meet'
import { WeatherBanner } from '../components/WeatherBanner'
import {
  CheckCircle2,
  Check,
  Clock,
  Target,
  Gavel,
  Heart,
  RefreshCw,
  AlertTriangle,
  Zap,
  Building,
  Cross,
  MapPin,
  Radio,
  ClipboardList,
} from 'lucide-react'

interface TaskItem {
  id: string
  label: string
  completed: boolean
  completedTime?: string
}

const initialTasks: TaskItem[] = [
  { id: 't1', label: 'Report to Jump Pit — East', completed: true, completedTime: '6:48 AM' },
  { id: 't2', label: 'Set up measuring tape and rake', completed: true, completedTime: '6:55 AM' },
  { id: 't3', label: 'Check takeoff board is level and secured', completed: true, completedTime: '7:00 AM' },
  { id: 't4', label: 'Assist with Girls Long Jump', completed: true, completedTime: '8:45 AM' },
  { id: 't5', label: 'Secure pit cover during weather delay', completed: false },
  { id: 't6', label: 'After delay: re-rake pit and verify board', completed: false },
  { id: 't7', label: 'Assist with Boys Triple Jump', completed: false },
  { id: 't8', label: 'End of shift: clean up area and hand off to Sarah Lopez (11:30 AM shift)', completed: false },
]

function formatNow() {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m} ${ampm}`
}

export function VolunteerView() {
  const rachel = volunteers.find(v => v.id === 'v5')!
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  const girlsLJ = events.find(e => e.id === 'lj-g')!
  const boysTJ = events.find(e => e.id === 'tj-b')!

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  const progressPct = Math.round((completedCount / totalCount) * 100)

  function toggleTask(id: string) {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t
        if (t.completed) {
          return { ...t, completed: false, completedTime: undefined }
        }
        return { ...t, completed: true, completedTime: formatNow() }
      })
    )
  }

  const hasWeatherAlert = !!meet.weather.alert

  return (
    <div className="pb-28">
      {/* ─── Full-Bleed Gradient Header ─── */}
      <div className="bg-gradient-to-b from-brick-700 via-brick-600 to-white pt-5 pb-14 px-5">
        <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
          Hi, Rachel
        </h1>
        <div className="flex items-center gap-2.5 mt-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 text-white text-[13px] font-semibold backdrop-blur-sm">
            {rachel.roleLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] text-white/70">
            <Clock size={13} />
            {rachel.shiftStart} — {rachel.shiftEnd}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 text-[14px] text-green-300 font-medium">
          <CheckCircle2 size={16} />
          <span>Checked in at {rachel.checkedInTime}</span>
        </div>
      </div>

      {/* ─── Assignment Card (overlapping header) ─── */}
      <div className="mx-5 -mt-8 relative z-10 mb-5">
        <div className="bg-white border border-sand-200 rounded-xl overflow-hidden shadow-md">
          <div className="bg-brick-700 px-4 py-3">
            <h2 className="text-[14px] font-bold text-white uppercase tracking-wider">Your Assignment</h2>
          </div>
          <div className="p-4 space-y-3.5">
            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brick-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={18} className="text-brick-700" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Location</div>
                <div className="text-[17px] font-bold text-sand-950">Jump Pit — East</div>
              </div>
            </div>

            {/* Role description */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brick-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ClipboardList size={18} className="text-brick-700" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Your Role Today</div>
                <div className="text-[15px] text-sand-800 leading-relaxed">
                  Assist officials with measuring, raking the pit, and recording marks
                </div>
              </div>
            </div>

            {/* Supervisor */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brick-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target size={18} className="text-brick-700" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Your Supervisor</div>
                <div className="text-[15px] font-semibold text-sand-950">Patricia Wong</div>
                <div className="text-[13px] text-sand-600">Head Field Judge</div>
              </div>
            </div>

            {/* Radio channel */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brick-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Radio size={18} className="text-brick-700" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Radio Channel</div>
                <div className="text-[15px] font-semibold text-sand-950">Channel 3 — Field Events</div>
              </div>
            </div>

            {/* View on Map button */}
            <button className="w-full mt-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brick-50 border border-brick-200 text-brick-700 font-semibold text-[15px] active:bg-brick-100 transition-colors">
              <MapPin size={16} />
              View on Map
            </button>
          </div>
        </div>
      </div>

      {/* Weather Alert */}
      {hasWeatherAlert && (
        <div>
          <WeatherBanner />
          <div className="mx-5 -mt-1 mb-5 bg-amber-50 border border-amber-200 border-t-0 rounded-b-xl px-4 py-3">
            <p className="text-[14px] text-sand-800 leading-relaxed font-medium">
              <span className="font-bold text-warning">Your action during weather delays:</span>{' '}
              Secure loose equipment, direct athletes to shelter, then proceed to designated shelter area (main building).
            </p>
          </div>
        </div>
      )}

      {/* Current Event at Your Station */}
      <div className="mx-5 mb-5">
        <h2 className="text-[13px] font-bold text-sand-500 uppercase tracking-wider mb-2.5 px-1">
          Events at Your Station
        </h2>
        <div className="space-y-2.5">
          {/* Girls Long Jump — Completed */}
          <div className="bg-success-light border border-green-200 rounded-xl px-4 py-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[16px] font-bold text-sand-950">{girlsLJ.name}</div>
                <div className="text-[13px] text-sand-600 mt-0.5">Scheduled: {girlsLJ.time}</div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 text-success text-[12px] font-bold uppercase tracking-wider">
                <Check size={14} /> Done
              </span>
            </div>
            {girlsLJ.results && (
              <div className="mt-2.5 pt-2.5 border-t border-green-200/60">
                <div className="text-[12px] font-semibold text-sand-500 mb-1">Top 3</div>
                {girlsLJ.results.map(r => (
                  <div key={r.place} className="flex items-center gap-2 text-[13px] text-sand-700 py-0.5">
                    <span className="w-5 text-center font-bold text-sand-500">{r.place}.</span>
                    <span className="font-medium">{r.athlete}</span>
                    <span className="text-sand-400">—</span>
                    <span>{r.mark}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Boys Triple Jump — Delayed */}
          <div className="bg-warning-light border border-amber-200 rounded-xl px-4 py-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-warning uppercase tracking-wider">Up Next</span>
                </div>
                <div className="text-[16px] font-bold text-sand-950 mt-0.5">{boysTJ.name}</div>
                <div className="text-[13px] text-sand-600 mt-0.5">
                  Originally: {boysTJ.time} → <span className="font-semibold text-warning">Delayed to {boysTJ.estimatedTime}</span>
                </div>
                {boysTJ.notes && (
                  <div className="text-[13px] text-sand-500 mt-0.5 italic">{boysTJ.notes}</div>
                )}
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
                <Clock size={20} className="text-warning" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Tasks */}
      <div className="mx-5 mb-5">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 className="text-[13px] font-bold text-sand-500 uppercase tracking-wider">
            Your Tasks
          </h2>
          <span className="text-[13px] font-semibold text-sand-600">
            {completedCount}/{totalCount}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3 mx-1">
          <div className="h-2.5 bg-sand-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brick-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-sand-200 rounded-xl overflow-hidden shadow-sm">
          {tasks.map((task, i) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`
                w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors active:bg-sand-50
                ${i < tasks.length - 1 ? 'border-b border-sand-100' : ''}
              `}
            >
              {/* Checkbox */}
              <div
                className={`
                  w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors
                  ${task.completed
                    ? 'bg-success text-white'
                    : 'border-2 border-sand-300 bg-white'
                  }
                `}
              >
                {task.completed && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Label + timestamp */}
              <div className="flex-1 min-w-0">
                <span
                  className={`
                    text-[15px] leading-snug block
                    ${task.completed ? 'text-sand-400 line-through' : 'text-sand-950 font-medium'}
                  `}
                >
                  {task.label}
                </span>
                {task.completed && task.completedTime && (
                  <span className="text-[12px] text-sand-400 mt-0.5 block">
                    Completed {task.completedTime}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Key Contacts */}
      <div className="mx-5 mb-5">
        <h2 className="text-[13px] font-bold text-sand-500 uppercase tracking-wider mb-2.5 px-1">
          Key Contacts
        </h2>
        <div className="bg-white border border-sand-200 rounded-xl overflow-hidden shadow-sm">
          {[
            { title: 'Meet Director', name: 'Coach Rivera', phone: '(512) 555-0101', icon: <Target size={18} className="text-sand-600" /> },
            { title: 'Head Field Judge', name: 'Patricia Wong', phone: '(512) 555-0105', icon: <Gavel size={18} className="text-sand-600" /> },
            { title: 'Medical', name: 'Dr. Sarah Kim', phone: '(512) 555-0106', icon: <Heart size={18} className="text-sand-600" /> },
            { title: 'Your Shift Replacement', name: 'Sarah Lopez', phone: '(512) 555-1007', icon: <RefreshCw size={18} className="text-sand-600" />, note: 'Arrives 11:30 AM' },
          ].map((contact, i, arr) => (
            <div
              key={contact.phone}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-sand-100' : ''}`}
            >
              <div className="w-9 h-9 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                {contact.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">{contact.title}</div>
                <div className="text-[15px] font-semibold text-sand-950">{contact.name}</div>
                {contact.note && (
                  <div className="text-[12px] text-sand-500">{contact.note}</div>
                )}
              </div>
              <a
                href={`tel:${contact.phone.replace(/\D/g, '')}`}
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brick-50 text-brick-700 font-semibold text-[13px] active:bg-brick-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Info — Collapsible */}
      <div className="mx-5 mb-6">
        <button
          onClick={() => setEmergencyOpen(!emergencyOpen)}
          className="w-full bg-danger-light border border-red-200 rounded-xl px-4 py-3.5 text-left transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={18} className="text-danger" />
              <span className="text-[15px] font-bold text-danger">Emergency Information</span>
            </div>
            <div className={`text-sand-400 transition-transform duration-200 ${emergencyOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>

        {emergencyOpen && (
          <div className="bg-white border border-red-200 border-t-0 rounded-b-xl -mt-3 pt-5 px-4 pb-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning-light flex items-center justify-center flex-shrink-0">
                <Zap size={16} className="text-warning" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-sand-950">Lightning Protocol</div>
                <div className="text-[14px] text-sand-700 leading-relaxed mt-0.5">
                  3 air horn blasts = <span className="font-bold text-danger">stop all activity</span>, seek shelter immediately
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-danger-light flex items-center justify-center flex-shrink-0">
                <Cross size={16} className="text-danger" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-sand-950">Medical Emergency</div>
                <div className="text-[14px] text-sand-700 leading-relaxed mt-0.5">
                  Call <a href="tel:911" className="font-bold text-brick-700 underline">911</a> first, then radio <span className="font-semibold">Channel 1</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-info-light flex items-center justify-center flex-shrink-0">
                <Heart size={16} className="text-info" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-sand-950">AED Location</div>
                <div className="text-[14px] text-sand-700 leading-relaxed mt-0.5">
                  Medical tent near the finish line
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center flex-shrink-0">
                <Building size={16} className="text-success" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-sand-950">Nearest Shelter</div>
                <div className="text-[14px] text-sand-700 leading-relaxed mt-0.5">
                  Main building — approximately 3 min walk north
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
