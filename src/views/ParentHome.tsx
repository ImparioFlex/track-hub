import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { meet, events, followedAthlete, type MeetEvent } from '../data/meet'
import { notifications } from '../data/mapPins'
import { WeatherBanner } from '../components/WeatherBanner'

function getEmmaResult(event: MeetEvent) {
  if (!event.results) return null
  return event.results.find((r) => r.athlete === followedAthlete.name)
}

function getEventName(eventId: string): string {
  const nameMap: Record<string, string> = {
    'lj-g': 'Long Jump',
    '400g': '400m',
    '200g': '200m',
  }
  return nameMap[eventId] || eventId
}

function CompletedCard({ event }: { event: MeetEvent }) {
  const result = getEmmaResult(event)
  const eventId = event.id
  const pr = followedAthlete.prs[eventId as keyof typeof followedAthlete.prs]

  return (
    <div className="bg-white rounded-lg border border-sand-200 p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-success uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-success inline-block" />
          Completed
        </span>
        <span className="text-[13px] text-sand-500">{event.time}</span>
      </div>
      {result ? (
        <>
          <p className="text-[20px] font-bold text-sand-950 leading-tight">
            {event.name} — {result.place === 1 ? '1st' : result.place === 2 ? '2nd' : result.place === 3 ? '3rd' : `${result.place}th`} Place
          </p>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-[28px] font-extrabold text-sand-950 tracking-tight">
              {result.mark}
            </span>
            {pr && (
              <span className="text-[15px] text-sand-500">
                PR: {pr}
              </span>
            )}
          </div>
        </>
      ) : (
        <p className="text-[18px] font-bold text-sand-950">{event.name}</p>
      )}
      <p className="text-[13px] text-sand-500 mt-1">{event.location}</p>
    </div>
  )
}

function DelayedCard({ event }: { event: MeetEvent }) {
  return (
    <div className="bg-amber-50/50 rounded-lg border border-amber-200 p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] font-semibold text-warning uppercase tracking-wide">
          Delayed
        </span>
        <span className="text-[13px] text-sand-600">
          <span className="line-through">{event.time}</span>
          {event.estimatedTime && (
            <span className="ml-2 font-semibold text-warning">
              {event.estimatedTime}
            </span>
          )}
        </span>
      </div>
      <p className="text-[20px] font-bold text-sand-950 leading-tight">
        {event.name}
      </p>
      <p className="text-[15px] text-sand-700 mt-1.5">
        {event.notes || 'Weather delay'}
      </p>
      <div className="flex items-center gap-2 mt-3 bg-white/60 rounded-md px-3 py-2">
        <div className="w-2 h-2 rounded-full bg-warning animate-pulse flex-shrink-0" />
        <span className="text-[14px] text-sand-700">
          We'll notify you 10 min before Emma's event starts
        </span>
      </div>
    </div>
  )
}

function UpcomingCard({ event }: { event: MeetEvent }) {
  const eventId = event.id
  const pr = followedAthlete.prs[eventId as keyof typeof followedAthlete.prs]

  return (
    <div className="bg-white rounded-lg border border-sand-200 p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] font-semibold text-sand-500 uppercase tracking-wide">
          Coming Up
        </span>
        <span className="text-[13px] text-sand-500">{event.time}</span>
      </div>
      <p className="text-[20px] font-bold text-sand-950 leading-tight">
        {event.name}
      </p>
      {pr && (
        <p className="text-[15px] text-sand-500 mt-1">PR: {pr}</p>
      )}
      <p className="text-[13px] text-sand-500 mt-1">{event.location}</p>
    </div>
  )
}

function NotificationItem({ notification }: { notification: typeof notifications[number] }) {
  const bgMap = {
    safety: 'bg-danger-light border-red-200',
    schedule: 'bg-warning-light border-amber-200',
    result: 'bg-success-light border-green-200',
    info: 'bg-sand-100 border-sand-200',
  }

  return (
    <div className={`rounded-lg border p-3.5 ${bgMap[notification.type]} relative`}>
      {!notification.read && (
        <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-info" />
      )}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-[15px] font-bold text-sand-950 leading-snug">
            {notification.title}
          </p>
          <p className="text-[14px] text-sand-700 leading-relaxed mt-1">
            {notification.message}
          </p>
          <p className="text-[12px] text-sand-500 mt-1.5">{notification.time}</p>
        </div>
      </div>
    </div>
  )
}

export function ParentView() {
  const [meetInfoOpen, setMeetInfoOpen] = useState(false)

  // Get Emma's events in chronological order
  const emmaEvents = followedAthlete.events
    .map((id) => events.find((e) => e.id === id))
    .filter((e): e is MeetEvent => e !== undefined)

  // Sort: completed first (by time), then delayed, then upcoming
  const statusOrder: Record<string, number> = {
    completed: 0,
    'in-progress': 1,
    delayed: 2,
    upcoming: 3,
    cancelled: 4,
  }
  const sortedEvents = [...emmaEvents].sort((a, b) => {
    const aOrder = statusOrder[a.status] ?? 3
    const bOrder = statusOrder[b.status] ?? 3
    if (aOrder !== bOrder) return aOrder - bOrder
    return 0 // preserve original order within same status
  })

  const completedCount = emmaEvents.filter((e) => e.status === 'completed').length
  const totalCount = emmaEvents.length

  return (
    <div className="min-h-dvh bg-sand-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-sand-200">
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-brick-600 uppercase tracking-wider mb-1">
                Following
              </p>
              <h1 className="text-[26px] font-extrabold text-sand-950 leading-none">
                {followedAthlete.name}
              </h1>
              <div className="flex items-center gap-2.5 mt-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brick-50 text-brick-700 text-[13px] font-bold border border-brick-200">
                  {followedAthlete.team}
                </span>
                <span className="text-[14px] text-sand-500">
                  Grade {followedAthlete.grade}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-sand-500 font-medium">
                {completedCount}/{totalCount} events done
              </p>
            </div>
          </div>

          {/* PR / Season Best Mini Table */}
          <div className="mt-4 bg-sand-50 rounded-lg border border-sand-200 overflow-hidden">
            <div className="grid grid-cols-4 text-[11px] font-bold text-sand-500 uppercase tracking-wider px-3 py-2 border-b border-sand-200 bg-sand-100">
              <span>Event</span>
              <span className="text-center">PR</span>
              <span className="text-center">SB</span>
              <span className="text-right">Today</span>
            </div>
            {followedAthlete.events.map((eventId) => {
              const event = events.find((e) => e.id === eventId)
              const result = event ? getEmmaResult(event) : null
              const pr = followedAthlete.prs[eventId as keyof typeof followedAthlete.prs]
              const sb = followedAthlete.seasonBests[eventId as keyof typeof followedAthlete.seasonBests]
              return (
                <div
                  key={eventId}
                  className="grid grid-cols-4 items-center px-3 py-2 border-b border-sand-100 last:border-0"
                >
                  <span className="text-[14px] font-semibold text-sand-950">
                    {getEventName(eventId)}
                  </span>
                  <span className="text-[14px] text-sand-600 text-center">{pr}</span>
                  <span className="text-[14px] text-sand-600 text-center">{sb}</span>
                  <span className="text-[14px] font-bold text-right">
                    {result ? (
                      <span className="text-success">{result.mark}</span>
                    ) : (
                      <span className="text-sand-400">--</span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Weather Alert */}
      <div className="mt-3">
        <WeatherBanner />
      </div>

      {/* Emma's Schedule */}
      <div className="px-4 mt-3">
        <h2 className="text-[18px] font-bold text-sand-950 mb-3">
          Emma's Schedule
        </h2>
        <div className="flex flex-col gap-3">
          {sortedEvents.map((event) => {
            switch (event.status) {
              case 'completed':
                return <CompletedCard key={event.id} event={event} />
              case 'delayed':
                return <DelayedCard key={event.id} event={event} />
              case 'upcoming':
              case 'in-progress':
              default:
                return <UpcomingCard key={event.id} event={event} />
            }
          })}
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="px-4 mt-8">
        <h2 className="text-[18px] font-bold text-sand-950 mb-3">
          Notifications
        </h2>
        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      </div>

      {/* Meet Info (Collapsible) */}
      <div className="px-4 mt-8">
        <button
          onClick={() => setMeetInfoOpen(!meetInfoOpen)}
          className="w-full bg-white rounded-lg border border-sand-200 p-4 text-left transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-sand-950">Meet Info</h2>
            <ChevronDown
              className={`w-5 h-5 text-sand-400 transition-transform duration-200 ${
                meetInfoOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {meetInfoOpen && (
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[12px] font-bold text-sand-500 uppercase tracking-wider">
                  Meet
                </p>
                <p className="text-[16px] font-semibold text-sand-950 mt-0.5">
                  {meet.name}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-sand-500 uppercase tracking-wider">
                  Venue
                </p>
                <p className="text-[16px] font-semibold text-sand-950 mt-0.5">
                  {meet.venue}
                </p>
                <p className="text-[14px] text-sand-600">
                  {meet.address}, {meet.city}, {meet.state}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-sand-500 uppercase tracking-wider">
                  Date
                </p>
                <p className="text-[16px] font-semibold text-sand-950 mt-0.5">
                  {meet.date}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-sand-50 rounded-md p-2.5">
                  <p className="text-[11px] font-bold text-sand-500 uppercase tracking-wider">
                    Gates
                  </p>
                  <p className="text-[15px] font-bold text-sand-950 mt-0.5">
                    {meet.gatesOpen}
                  </p>
                </div>
                <div className="bg-sand-50 rounded-md p-2.5">
                  <p className="text-[11px] font-bold text-sand-500 uppercase tracking-wider">
                    First Event
                  </p>
                  <p className="text-[15px] font-bold text-sand-950 mt-0.5">
                    {meet.firstEvent}
                  </p>
                </div>
                <div className="bg-sand-50 rounded-md p-2.5">
                  <p className="text-[11px] font-bold text-sand-500 uppercase tracking-wider">
                    Last Event
                  </p>
                  <p className="text-[15px] font-bold text-sand-950 mt-0.5">
                    {meet.lastEvent}
                  </p>
                </div>
              </div>
              <button className="w-full mt-2 py-3 rounded-lg bg-brick-700 text-white text-[15px] font-bold active:bg-brick-800 transition-colors">
                View Venue Map
              </button>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
