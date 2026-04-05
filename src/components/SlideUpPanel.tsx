import { useEffect, useRef, type ReactNode } from 'react'

interface SlideUpPanelProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  fullHeight?: boolean
}

export function SlideUpPanel({ open, onClose, title, children, fullHeight = false }: SlideUpPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] max-w-[430px] mx-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`
          absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl
          transform transition-transform duration-300 ease-out
          ${fullHeight ? 'top-10' : 'max-h-[85vh]'}
          flex flex-col
        `}
        style={{
          animation: 'slideUp 300ms cubic-bezier(0.32, 0.72, 0, 1)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-sand-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 pb-3 border-b border-sand-100 flex-shrink-0">
            <h2 className="text-lg font-bold text-sand-950">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-sand-100 text-sand-600 hover:bg-sand-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
