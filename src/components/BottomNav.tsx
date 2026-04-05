import { type ReactNode } from 'react'

export interface NavItem {
  id: string
  label: string
  icon: ReactNode
  badge?: number
}

interface BottomNavProps {
  items: NavItem[]
  activeId: string
  onSelect: (id: string) => void
}

export function BottomNav({ items, activeId, onSelect }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-lg border-t border-sand-200 z-50"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
      <div className="flex items-center justify-around px-2 pt-2">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
                relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 min-w-[64px]
                ${active ? 'text-brick-700' : 'text-sand-500'}
              `}
            >
              {active && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-brick-600" />
              )}
              <div className={`relative text-[22px] transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-medium ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
