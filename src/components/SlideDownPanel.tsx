import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface SlideDownPanelProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function SlideDownPanel({ open, onClose, title, children }: SlideDownPanelProps) {
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
        style={{ animation: 'fadeIn 200ms ease-out' }}
      />

      {/* Panel */}
      <div
        className="absolute top-0 left-0 right-0 bg-white rounded-b-2xl shadow-2xl max-h-[70vh] flex flex-col"
        style={{
          animation: 'slideDown 300ms cubic-bezier(0.32, 0.72, 0, 1)',
          paddingTop: 'max(env(safe-area-inset-top), 8px)',
        }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 pt-3 pb-3 border-b border-sand-100 flex-shrink-0">
            <h2 className="text-[17px] font-bold text-sand-950">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-sand-100 text-sand-600 hover:bg-sand-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>

        {/* Handle */}
        <div className="flex justify-center py-2 flex-shrink-0">
          <div className="w-10 h-1 bg-sand-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}
