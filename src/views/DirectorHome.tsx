import { useState } from 'react'
import { ChevronDown, Users, CalendarCheck, AlertCircle } from 'lucide-react'
import { meet, events, type MeetEvent } from '../data/meet'
import { staff, volunteers, type StaffMember, type Volunteer } from '../data/staff'
import { checklist, type ChecklistItem, type ChecklistPhase } from '../data/checklist'
import { WeatherBanner } from '../components/WeatherBanner'
import { SlideUpPanel } from '../components/SlideUpPanel'

type Tab = 'dashboard' | 'checklist' | 'team' | 'schedule'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const completedEvents = events.filter(e => e.status === 'completed')
const inProgressEvents = events.filter(e => e.status === 'in-progress')
const delayedEvents = events.filter(e => e.status === 'delayed')
const upcomingEvents = events.filter(e => e.status === 'upcoming')

const volunteersCheckedIn = volunteers.filter(v => v.checkedIn).length
const staffCheckedIn = staff.filter(s => s.checkedIn).length

function statusColor(status: MeetEvent['status']) {
  switch (status) {
    case 'completed': return 'bg-success-light text-success'
    case 'in-progress': return 'bg-info-light text-info'
    case 'delayed': return 'bg-warning-light text-warning'
    case 'upcoming': return 'bg-sand-100 text-sand-600'
    case 'cancelled': return 'bg-danger-light text-danger'
  }
}

function statusLabel(status: MeetEvent['status']) {
  switch (status) {
    case 'completed': return 'Complete'
    case 'in-progress': return 'Live'
    case 'delayed': return 'Delayed'
    case 'upcoming': return 'Upcoming'
    case 'cancelled': return 'Cancelled'
  }
}

function priorityBadge(priority: ChecklistItem['priority']) {
  switch (priority) {
    case 'critical': return <span className="text-[11px] font-bold uppercase tracking-wider text-danger bg-danger-light px-1.5 py-0.5 rounded-sm">Critical</span>
    case 'high': return <span className="text-[11px] font-bold uppercase tracking-wider text-warning bg-warning-light px-1.5 py-0.5 rounded-sm">High</span>
    case 'normal': return null
  }
}

function groupChecklist() {
  const phases: { key: ChecklistPhase; label: string; items: ChecklistItem[] }[] = []
  const seen = new Set<string>()
  for (const item of checklist) {
    const key = item.phase
    if (!seen.has(key)) {
      seen.add(key)
      phases.push({ key, label: item.phaseLabel, items: [] })
    }
    phases.find(p => p.key === key)!.items.push(item)
  }
  return phases
}

function groupVolunteersByRole() {
  const groups: { role: string; label: string; members: Volunteer[] }[] = []
  const seen = new Map<string, number>()
  for (const v of volunteers) {
    if (!seen.has(v.role)) {
      seen.set(v.role, groups.length)
      groups.push({ role: v.role, label: v.roleLabel, members: [] })
    }
    groups[seen.get(v.role)!].members.push(v)
  }
  return groups
}

const checklistPhases = groupChecklist()
const volunteerGroups = groupVolunteersByRole()

function findActivePhase(): ChecklistPhase {
  for (const phase of checklistPhases) {
    if (phase.items.some(i => !i.completed)) return phase.key
  }
  return checklistPhases[checklistPhases.length - 1].key
}

const nextUpEvents = [...inProgressEvents, ...delayedEvents, ...upcomingEvents].slice(0, 3)

// ─── Main Component ──────────────────────────────────────────────────────────

export function DirectorView() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'team', label: 'Team' },
    { id: 'schedule', label: 'Schedule' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Tab Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-100">
        <div className="flex gap-1 px-4 py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 py-2 px-3 rounded-lg text-[13px] font-semibold tracking-wide transition-all
                ${activeTab === tab.id
                  ? 'bg-brick-700 text-white shadow-sm'
                  : 'text-sand-500 hover:text-sand-700 hover:bg-sand-50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-8">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'checklist' && <ChecklistTab />}
        {activeTab === 'team' && <TeamTab />}
        {activeTab === 'schedule' && <ScheduleTab />}
      </div>
    </div>
  )
}

// ─── Dashboard Tab ───────────────────────────────────────────────────────────

function DashboardTab() {
  return (
    <div>
      {/* ─── Gradient Header with Meet Stats ─── */}
      <div className="bg-gradient-to-b from-brick-700 via-brick-600 to-white pt-5 pb-12 px-5">
        <h2 className="text-[22px] font-extrabold text-white leading-tight">Meet Command</h2>
        <p className="text-[14px] text-white/60 mt-0.5">{meet.name} · {meet.date}</p>

        {/* Stat pills */}
        <div className="flex gap-2.5 mt-4">
          <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5 text-center">
            <div className="text-[22px] font-extrabold text-white leading-none">{meet.teamCount}</div>
            <div className="text-[11px] text-white/60 font-medium mt-0.5 uppercase tracking-wider">Teams</div>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5 text-center">
            <div className="text-[22px] font-extrabold text-white leading-none">{meet.athleteCount}</div>
            <div className="text-[11px] text-white/60 font-medium mt-0.5 uppercase tracking-wider">Athletes</div>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5 text-center">
            <div className="text-[22px] font-extrabold text-white leading-none">{meet.eventCount}</div>
            <div className="text-[11px] text-white/60 font-medium mt-0.5 uppercase tracking-wider">Events</div>
          </div>
        </div>
      </div>

      {/* ─── Progress Card (overlapping header) ─── */}
      <div className="mx-5 -mt-6 relative z-10 mb-5">
        <div className="bg-white rounded-xl p-4 shadow-md border border-sand-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-sand-950 uppercase tracking-wider">Event Progress</span>
            <span className="text-[14px] font-semibold text-sand-700">
              {completedEvents.length} / {events.length}
            </span>
          </div>
          <div className="w-full h-2.5 bg-sand-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brick-700 rounded-full transition-all duration-500"
              style={{ width: `${(completedEvents.length / events.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-4 mt-2.5 text-[12px] text-sand-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success inline-block" />
              {completedEvents.length} complete
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-info animate-pulse inline-block" />
              {inProgressEvents.length} live
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-warning inline-block" />
              {delayedEvents.length} delayed
            </span>
          </div>
        </div>
      </div>

      {/* Weather Banner */}
      <WeatherBanner />

      {/* Next Up */}
      <div className="mx-5 mb-5">
        <h3 className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5 px-1">Next Up</h3>
        <div className="space-y-2.5">
          {nextUpEvents.map(ev => (
            <div key={ev.id} className="flex items-center gap-3 bg-white border border-sand-100 rounded-xl p-3.5 shadow-sm">
              {ev.status === 'in-progress' && (
                <div className="w-2.5 h-2.5 rounded-full bg-info animate-pulse flex-shrink-0" />
              )}
              {ev.status === 'delayed' && (
                <div className="w-2.5 h-2.5 rounded-full bg-warning flex-shrink-0" />
              )}
              {ev.status === 'upcoming' && (
                <div className="w-2.5 h-2.5 rounded-full bg-sand-300 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-sand-950">{ev.name}</div>
                <div className="text-[13px] text-sand-500">{ev.location}</div>
              </div>
              <div className="text-right flex-shrink-0">
                {ev.status === 'delayed' ? (
                  <div>
                    <div className="text-[12px] text-sand-400 line-through">{ev.time}</div>
                    <div className="text-[13px] font-semibold text-warning">{ev.estimatedTime}</div>
                  </div>
                ) : (
                  <div className="text-[13px] font-semibold text-sand-700">{ev.time}</div>
                )}
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-sm mt-0.5 inline-block ${statusColor(ev.status)}`}>
                  {statusLabel(ev.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issues Needing Attention */}
      <div className="mx-5 mb-5">
        <h3 className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5 px-1">Needs Attention</h3>
        <div className="space-y-2.5">
          <div className="bg-danger-light border border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-danger mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-[15px] font-semibold text-sand-950">Derek Mitchell (HJ/PV volunteer)</div>
                <div className="text-[13px] text-danger font-medium mt-0.5">20 min late, no response to text</div>
              </div>
            </div>
          </div>

          <div className="bg-warning-light border border-amber-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-[15px] font-semibold text-sand-950">Lisa Park (Athletic Trainer)</div>
                <div className="text-[13px] text-warning font-medium mt-0.5">Not checked in yet — expected by 7:00 AM</div>
              </div>
            </div>
          </div>

          <div className="bg-warning-light border border-amber-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
              <div>
                <div className="text-[15px] font-semibold text-sand-950">Weather delay</div>
                <div className="text-[13px] text-warning font-medium mt-0.5">{delayedEvents.length} events pushed back</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mx-5 mb-5">
        <h3 className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5 px-1">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-sand-100">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-brick-600" />
              <span className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Volunteers</span>
            </div>
            <div className="text-[22px] font-bold text-sand-950">{volunteersCheckedIn}/{volunteers.length}</div>
            <div className="w-full h-2 bg-sand-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: `${(volunteersCheckedIn / volunteers.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-sand-100">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-brick-600" />
              <span className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Staff</span>
            </div>
            <div className="text-[22px] font-bold text-sand-950">{staffCheckedIn}/{staff.length}</div>
            <div className="w-full h-2 bg-sand-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: `${(staffCheckedIn / staff.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-sand-100">
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck size={16} className="text-brick-600" />
              <span className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Completed</span>
            </div>
            <div className="text-[22px] font-bold text-sand-950">{completedEvents.length}</div>
            <div className="text-[13px] text-sand-500 mt-0.5">events finished</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-sand-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-warning" />
              <span className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider">Delayed</span>
            </div>
            <div className="text-[22px] font-bold text-warning">{delayedEvents.length}</div>
            <div className="text-[13px] text-sand-500 mt-0.5">weather hold</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Checklist Tab ───────────────────────────────────────────────────────────

function ChecklistTab() {
  const activePhase = findActivePhase()
  const [expandedPhases, setExpandedPhases] = useState<Set<ChecklistPhase>>(() => {
    const set = new Set<ChecklistPhase>()
    set.add(activePhase)
    return set
  })
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const togglePhase = (phase: ChecklistPhase) => {
    setExpandedPhases(prev => {
      const next = new Set(prev)
      if (next.has(phase)) next.delete(phase)
      else next.add(phase)
      return next
    })
  }

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const totalCompleted = checklist.filter(i => i.completed).length

  return (
    <div className="px-5 pt-4">
      {/* Overall progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] font-bold text-sand-950 uppercase tracking-wider">Meet Checklist</span>
        <span className="text-[13px] font-semibold text-sand-600">{totalCompleted}/{checklist.length} complete</span>
      </div>
      <div className="w-full h-2.5 bg-sand-200 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-brick-700 rounded-full transition-all duration-500"
          style={{ width: `${(totalCompleted / checklist.length) * 100}%` }}
        />
      </div>

      {/* Phases */}
      <div className="space-y-3">
        {checklistPhases.map(phase => {
          const phaseCompleted = phase.items.filter(i => i.completed).length
          const allDone = phaseCompleted === phase.items.length
          const isExpanded = expandedPhases.has(phase.key)

          return (
            <div key={phase.key} className="rounded-xl border border-sand-100 overflow-hidden shadow-sm">
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.key)}
                className={`w-full flex items-center justify-between p-3.5 text-left transition-colors ${
                  allDone ? 'bg-success-light/50' : phase.key === activePhase ? 'bg-brick-50' : 'bg-sand-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-sand-950 leading-snug">{phase.label}</div>
                  <div className="text-[12px] text-sand-500 mt-0.5">
                    {phaseCompleted}/{phase.items.length}
                    {allDone && ' ✓'}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-sand-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Phase Items */}
              {isExpanded && (
                <div className="divide-y divide-sand-100">
                  {phase.items.map(item => {
                    const isItemExpanded = expandedItems.has(item.id)
                    return (
                      <div key={item.id} className={item.completed ? 'opacity-60' : ''}>
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-left p-3.5 flex items-start gap-3 transition-colors hover:bg-sand-50/50"
                        >
                          <div className={`
                            w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${item.completed
                              ? 'bg-success border-success text-white'
                              : 'border-sand-300'
                            }
                          `}>
                            {item.completed && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[14px] font-semibold leading-snug ${item.completed ? 'line-through text-sand-500' : 'text-sand-950'}`}>
                                {item.title}
                              </span>
                              {priorityBadge(item.priority)}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[12px] text-sand-500">{item.assignee}</span>
                              {item.time && <span className="text-[12px] text-sand-400">{item.time}</span>}
                              {item.completed && item.completedTime && (
                                <span className="text-[11px] text-success font-medium">{item.completedTime}</span>
                              )}
                            </div>
                            {(item.warning || item.tip) && !isItemExpanded && (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                {item.warning && <span className="text-[11px] text-warning font-medium">Has warning</span>}
                                {item.warning && item.tip && <span className="text-[11px] text-sand-300">|</span>}
                                {item.tip && <span className="text-[11px] text-info font-medium">Has tip</span>}
                              </div>
                            )}
                          </div>

                          <ChevronDown className={`w-3.5 h-3.5 text-sand-300 transition-transform duration-200 mt-1 ${isItemExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {isItemExpanded && (
                          <div className="px-3.5 pb-3.5 ml-8 space-y-2.5">
                            <p className="text-[13px] text-sand-700 leading-relaxed">{item.description}</p>

                            {item.warning && (
                              <div className="bg-warning-light border border-amber-200 rounded-lg p-3">
                                <div className="text-[11px] font-bold text-warning uppercase tracking-wider mb-1">Warning</div>
                                <p className="text-[13px] text-sand-800 leading-relaxed">{item.warning}</p>
                              </div>
                            )}

                            {item.tip && (
                              <div className="bg-info-light border border-blue-200 rounded-lg p-3">
                                <div className="text-[11px] font-bold text-info uppercase tracking-wider mb-1">Tip</div>
                                <p className="text-[13px] text-sand-800 leading-relaxed">{item.tip}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Team Tab ────────────────────────────────────────────────────────────────

function TeamTab() {
  const [selectedPerson, setSelectedPerson] = useState<{ type: 'staff'; data: StaffMember } | { type: 'volunteer'; data: Volunteer } | null>(null)

  const isVolunteerLate = (v: Volunteer) => {
    return !v.checkedIn && v.notes && !v.notes.includes('Second shift') && !v.notes.includes('not due yet')
  }

  return (
    <div>
      {/* Summary Bar */}
      <div className="px-5 pt-4 pb-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-sand-100">
            <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider mb-1">Staff Checked In</div>
            <div className="text-[22px] font-bold text-sand-950">{staffCheckedIn}/{staff.length}</div>
            <div className="w-full h-2 bg-sand-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: `${(staffCheckedIn / staff.length) * 100}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-sand-100">
            <div className="text-[12px] font-semibold text-sand-500 uppercase tracking-wider mb-1">Volunteers</div>
            <div className="text-[22px] font-bold text-sand-950">{volunteersCheckedIn}/{volunteers.length}</div>
            <div className="w-full h-2 bg-sand-100 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: `${(volunteersCheckedIn / volunteers.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Officials & Staff */}
      <div className="px-5 mb-5">
        <h3 className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5 px-1">Officials &amp; Staff</h3>
        <div className="space-y-2">
          {staff.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedPerson({ type: 'staff', data: s })}
              className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-colors shadow-sm ${
                !s.checkedIn ? 'bg-warning-light border border-amber-200' : 'bg-white border border-sand-100'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.checkedIn ? 'bg-success' : 'bg-danger'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-sand-950 truncate">{s.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[12px] font-medium text-brick-700 bg-brick-50 px-1.5 py-0.5 rounded-sm">{s.roleLabel}</span>
                  {s.certification && <span className="text-[11px] text-sand-500">{s.certification}</span>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {s.checkedIn ? (
                  <span className="text-[12px] text-success font-medium">{s.checkedInTime}</span>
                ) : (
                  <span className="text-[12px] text-danger font-medium">Not in</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Volunteers */}
      <div className="px-5 mb-5">
        <h3 className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5 px-1">Volunteers</h3>
        <div className="space-y-4">
          {volunteerGroups.map(group => (
            <div key={group.role}>
              <div className="text-[12px] font-semibold text-sand-600 uppercase tracking-wider mb-1.5 px-1">{group.label}</div>
              <div className="space-y-2">
                {group.members.map(v => {
                  const late = isVolunteerLate(v)
                  const isDerekMitchell = v.name === 'Derek Mitchell'
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedPerson({ type: 'volunteer', data: v })}
                      className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-colors shadow-sm ${
                        isDerekMitchell
                          ? 'bg-danger-light border border-red-200'
                          : late
                            ? 'bg-warning-light border border-amber-200'
                            : 'bg-white border border-sand-100'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        v.checkedIn ? 'bg-success' : isDerekMitchell ? 'bg-danger' : 'bg-sand-300'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-sand-950 truncate">{v.name}</div>
                        {isDerekMitchell && (
                          <div className="text-[12px] text-danger font-semibold mt-0.5">20 min late — no response to text</div>
                        )}
                        {!isDerekMitchell && v.notes && !v.checkedIn && (
                          <div className="text-[12px] text-sand-500 mt-0.5">{v.notes}</div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        {v.checkedIn ? (
                          <span className="text-[12px] text-success font-medium">{v.checkedInTime}</span>
                        ) : (
                          <span className="text-[12px] text-sand-400 font-medium">
                            {v.shiftStart}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff/Volunteer Detail Panel */}
      <SlideUpPanel
        open={selectedPerson !== null}
        onClose={() => setSelectedPerson(null)}
        title={selectedPerson ? selectedPerson.data.name : ''}
      >
        {selectedPerson && selectedPerson.type === 'staff' && (
          <StaffDetailPanel person={selectedPerson.data} />
        )}
        {selectedPerson && selectedPerson.type === 'volunteer' && (
          <VolunteerDetailPanel person={selectedPerson.data} />
        )}
      </SlideUpPanel>
    </div>
  )
}

function StaffDetailPanel({ person }: { person: StaffMember }) {
  return (
    <div className="px-5 py-4 space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="text-[13px] font-semibold text-brick-700 bg-brick-50 px-2.5 py-1 rounded-lg">{person.roleLabel}</span>
        {person.checkedIn ? (
          <span className="text-[13px] font-semibold text-success bg-success-light px-2.5 py-1 rounded-lg">Checked in {person.checkedInTime}</span>
        ) : (
          <span className="text-[13px] font-semibold text-danger bg-danger-light px-2.5 py-1 rounded-lg">Not checked in</span>
        )}
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-3 bg-sand-50 rounded-xl p-4">
          <div className="text-[14px] text-sand-500 flex-shrink-0 w-14 font-medium">Phone</div>
          <a href={`tel:${person.phone}`} className="text-[15px] font-semibold text-brick-700">{person.phone}</a>
        </div>
        <div className="flex items-center gap-3 bg-sand-50 rounded-xl p-4">
          <div className="text-[14px] text-sand-500 flex-shrink-0 w-14 font-medium">Email</div>
          <a href={`mailto:${person.email}`} className="text-[14px] font-semibold text-brick-700 break-all">{person.email}</a>
        </div>
        {person.certification && (
          <div className="flex items-center gap-3 bg-sand-50 rounded-xl p-4">
            <div className="text-[14px] text-sand-500 flex-shrink-0 w-14 font-medium">Cert</div>
            <span className="text-[14px] font-semibold text-sand-950">{person.certification}</span>
          </div>
        )}
      </div>

      {person.notes && (
        <div className="bg-sand-50 rounded-xl p-4">
          <div className="text-[12px] font-bold text-sand-500 uppercase tracking-wider mb-1">Notes</div>
          <p className="text-[14px] text-sand-800 leading-relaxed">{person.notes}</p>
        </div>
      )}
    </div>
  )
}

function VolunteerDetailPanel({ person }: { person: Volunteer }) {
  const isDerekMitchell = person.name === 'Derek Mitchell'
  return (
    <div className="px-5 py-4 space-y-4">
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="text-[13px] font-semibold text-brick-700 bg-brick-50 px-2.5 py-1 rounded-lg">{person.roleLabel}</span>
        {person.checkedIn ? (
          <span className="text-[13px] font-semibold text-success bg-success-light px-2.5 py-1 rounded-lg">Checked in {person.checkedInTime}</span>
        ) : isDerekMitchell ? (
          <span className="text-[13px] font-semibold text-danger bg-danger-light px-2.5 py-1 rounded-lg">20 min late — no response</span>
        ) : (
          <span className="text-[13px] font-semibold text-sand-600 bg-sand-100 px-2.5 py-1 rounded-lg">Not checked in</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-sand-50 rounded-xl p-4">
          <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">Shift Start</div>
          <div className="text-[16px] font-bold text-sand-950">{person.shiftStart}</div>
        </div>
        <div className="bg-sand-50 rounded-xl p-4">
          <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">Shift End</div>
          <div className="text-[16px] font-bold text-sand-950">{person.shiftEnd}</div>
        </div>
      </div>

      <div className="bg-sand-50 rounded-xl p-4">
        <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">Location</div>
        <div className="text-[15px] font-semibold text-sand-950">{person.location}</div>
      </div>

      <div className="flex items-center gap-3 bg-sand-50 rounded-xl p-4">
        <div className="text-[14px] text-sand-500 flex-shrink-0 w-14 font-medium">Phone</div>
        <a href={`tel:${person.phone}`} className="text-[15px] font-semibold text-brick-700">{person.phone}</a>
      </div>

      {person.notes && (
        <div className={`rounded-xl p-4 ${isDerekMitchell ? 'bg-danger-light border border-red-200' : 'bg-sand-50'}`}>
          <div className="text-[12px] font-bold text-sand-500 uppercase tracking-wider mb-1">Notes</div>
          <p className={`text-[14px] leading-relaxed ${isDerekMitchell ? 'text-danger font-semibold' : 'text-sand-800'}`}>{person.notes}</p>
        </div>
      )}
    </div>
  )
}

// ─── Schedule Tab ────────────────────────────────────────────────────────────

function ScheduleTab() {
  const [selectedEvent, setSelectedEvent] = useState<MeetEvent | null>(null)

  const sections: { title: string; events: MeetEvent[]; type: MeetEvent['status'] }[] = [
    { title: 'In Progress', events: inProgressEvents, type: 'in-progress' },
    { title: 'Delayed', events: delayedEvents, type: 'delayed' },
    { title: 'Upcoming', events: upcomingEvents, type: 'upcoming' },
    { title: 'Completed', events: completedEvents, type: 'completed' },
  ]

  return (
    <div className="px-5 pt-4">
      {/* Schedule Summary */}
      <div className="flex items-center gap-3 mb-4 text-[12px]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-info animate-pulse inline-block" />
          <span className="text-sand-600 font-medium">{inProgressEvents.length} live</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-warning inline-block" />
          <span className="text-sand-600 font-medium">{delayedEvents.length} delayed</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sand-300 inline-block" />
          <span className="text-sand-600 font-medium">{upcomingEvents.length} upcoming</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success inline-block" />
          <span className="text-sand-600 font-medium">{completedEvents.length} done</span>
        </span>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {sections.map(section => {
          if (section.events.length === 0) return null
          return (
            <div key={section.title}>
              <h3 className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5 px-1">{section.title}</h3>
              <div className="space-y-2.5">
                {section.events.map(ev => (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className={`w-full text-left rounded-xl p-4 transition-colors shadow-sm ${
                      ev.status === 'delayed'
                        ? 'bg-warning-light border border-amber-200'
                        : ev.status === 'in-progress'
                          ? 'bg-info-light border border-blue-200'
                          : ev.status === 'completed'
                            ? 'bg-sand-50 border border-sand-100 opacity-70'
                            : 'bg-white border border-sand-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {ev.status === 'in-progress' && <div className="w-2.5 h-2.5 rounded-full bg-info animate-pulse" />}
                        {ev.status === 'delayed' && <div className="w-2.5 h-2.5 rounded-full bg-warning" />}
                        {ev.status === 'completed' && <div className="w-2.5 h-2.5 rounded-full bg-success" />}
                        {ev.status === 'upcoming' && <div className="w-2.5 h-2.5 rounded-full bg-sand-300" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[15px] font-semibold ${ev.status === 'completed' ? 'text-sand-600' : 'text-sand-950'}`}>
                            {ev.name}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${statusColor(ev.status)}`}>
                            {statusLabel(ev.status)}
                          </span>
                        </div>
                        <div className="text-[12px] text-sand-500">{ev.location}</div>

                        {ev.notes && (ev.status === 'in-progress' || ev.status === 'delayed') && (
                          <div className="text-[12px] text-sand-700 mt-1 font-medium">{ev.notes}</div>
                        )}

                        {ev.status === 'completed' && ev.results && (
                          <div className="mt-2 space-y-0.5">
                            {ev.results.slice(0, 3).map(r => (
                              <div key={r.place} className="flex items-center gap-2 text-[12px]">
                                <span className={`w-4 text-center font-bold ${
                                  r.place === 1 ? 'text-brick-700' : 'text-sand-500'
                                }`}>{r.place}</span>
                                <span className="text-sand-700 truncate">{r.athlete}</span>
                                <span className="text-sand-400 truncate">{r.team}</span>
                                <span className="text-sand-950 font-semibold ml-auto flex-shrink-0">{r.mark}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="text-right flex-shrink-0">
                        {ev.status === 'delayed' ? (
                          <div>
                            <div className="text-[12px] text-sand-400 line-through">{ev.time}</div>
                            <div className="text-[14px] font-bold text-warning">{ev.estimatedTime}</div>
                          </div>
                        ) : (
                          <div className="text-[14px] font-semibold text-sand-700">{ev.time}</div>
                        )}
                        {ev.type === 'track' && ev.heatCount && (
                          <div className="text-[11px] text-sand-400 mt-0.5">{ev.heatCount} heat{ev.heatCount > 1 ? 's' : ''}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Event Detail Panel */}
      <SlideUpPanel
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.name || ''}
      >
        {selectedEvent && <EventDetailPanel event={selectedEvent} />}
      </SlideUpPanel>
    </div>
  )
}

function EventDetailPanel({ event }: { event: MeetEvent }) {
  return (
    <div className="px-5 py-4 space-y-4">
      <div className="flex items-center gap-2.5">
        <span className={`text-[12px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${statusColor(event.status)}`}>
          {statusLabel(event.status)}
        </span>
        <span className="text-[12px] font-semibold text-sand-600 bg-sand-100 px-2.5 py-1 rounded-lg uppercase">
          {event.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-sand-50 rounded-xl p-4">
          <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">
            {event.status === 'delayed' ? 'Original Time' : 'Time'}
          </div>
          <div className={`text-[16px] font-bold ${event.status === 'delayed' ? 'text-sand-400 line-through' : 'text-sand-950'}`}>
            {event.time}
          </div>
        </div>
        {event.status === 'delayed' && event.estimatedTime && (
          <div className="bg-warning-light rounded-xl p-4">
            <div className="text-[12px] font-medium text-warning uppercase tracking-wider mb-0.5">Est. Resume</div>
            <div className="text-[16px] font-bold text-warning">{event.estimatedTime}</div>
          </div>
        )}
        {event.status !== 'delayed' && (
          <div className="bg-sand-50 rounded-xl p-4">
            <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">Type</div>
            <div className="text-[16px] font-bold text-sand-950 capitalize">{event.type} Event</div>
          </div>
        )}
      </div>

      <div className="bg-sand-50 rounded-xl p-4">
        <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">Location</div>
        <div className="text-[15px] font-semibold text-sand-950">{event.location}</div>
      </div>

      {event.heatCount && (
        <div className="bg-sand-50 rounded-xl p-4">
          <div className="text-[12px] font-medium text-sand-500 uppercase tracking-wider mb-0.5">Heats</div>
          <div className="text-[15px] font-semibold text-sand-950">
            {event.currentHeat ? `Heat ${event.currentHeat} of ${event.heatCount}` : `${event.heatCount} heat${event.heatCount > 1 ? 's' : ''}`}
          </div>
        </div>
      )}

      {event.notes && (
        <div className={`rounded-xl p-4 ${event.status === 'delayed' ? 'bg-warning-light border border-amber-200' : 'bg-sand-50'}`}>
          <div className="text-[12px] font-bold text-sand-500 uppercase tracking-wider mb-1">Notes</div>
          <p className={`text-[14px] leading-relaxed ${event.status === 'delayed' ? 'text-warning font-medium' : 'text-sand-800'}`}>{event.notes}</p>
        </div>
      )}

      {event.results && event.results.length > 0 && (
        <div>
          <div className="text-[13px] font-bold text-sand-950 uppercase tracking-wider mb-2.5">Results</div>
          <div className="space-y-2">
            {event.results.map(r => (
              <div
                key={r.place}
                className={`flex items-center gap-3 rounded-xl p-3.5 ${
                  r.place === 1 ? 'bg-brick-50 border border-brick-100' : 'bg-sand-50'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 ${
                  r.place === 1
                    ? 'bg-brick-700 text-white'
                    : r.place === 2
                      ? 'bg-sand-300 text-sand-800'
                      : 'bg-sand-200 text-sand-600'
                }`}>
                  {r.place}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-semibold text-sand-950 truncate">{r.athlete}</div>
                  <div className="text-[12px] text-sand-500">{r.team}</div>
                </div>
                <div className="text-[16px] font-bold text-sand-950 flex-shrink-0">{r.mark}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
