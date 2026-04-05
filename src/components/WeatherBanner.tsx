import { useState } from 'react'
import { meet } from '../data/meet'

export function WeatherBanner() {
  const [expanded, setExpanded] = useState(false)
  const alert = meet.weather.alert

  if (!alert) return null

  const iconMap = {
    lightning: '⚡',
    heat: '🌡️',
    wind: '💨',
    rain: '🌧️',
  }

  // Calculate countdown
  const estimatedResume = alert.estimatedResume || 'TBD'

  return (
    <div className="mx-4 mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 rounded-2xl p-4 text-left transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0 mt-0.5">{iconMap[alert.type]}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] font-bold text-danger uppercase tracking-wider">Weather Hold</span>
              <span className="text-[12px] text-sand-500">since {alert.since}</span>
            </div>
            <p className="text-[15px] font-semibold text-sand-950 leading-snug">{alert.message}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[13px] text-sand-700">Est. resume: <strong>{estimatedResume}</strong></span>
              </div>
            </div>
          </div>
          <div className={`text-sand-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            ▾
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-amber-200/60">
            <p className="text-[14px] text-sand-700 leading-relaxed">{alert.details}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-white/60 rounded-lg p-2.5">
                <div className="text-[11px] text-sand-500 uppercase tracking-wider font-medium">Temp</div>
                <div className="text-[15px] font-semibold text-sand-950">{meet.weather.temp}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-2.5">
                <div className="text-[11px] text-sand-500 uppercase tracking-wider font-medium">Wind</div>
                <div className="text-[15px] font-semibold text-sand-950">{meet.weather.wind}</div>
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  )
}
