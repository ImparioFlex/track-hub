import { useState, useMemo } from 'react'
import { vendors, type Vendor, type VendorCategory } from '../data/vendors'
import { SlideUpPanel } from '../components/SlideUpPanel'
import { Check, Search, SearchX } from 'lucide-react'

const categories: { id: VendorCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'announcer', label: 'Announcers' },
  { id: 'timing', label: 'Timing' },
  { id: 'photographer', label: 'Photographers' },
]

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating)
  const partial = rating - full
  const empty = 5 - full - (partial > 0 ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-px" style={{ fontSize: size }}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="text-amber-500">&#9733;</span>
      ))}
      {partial > 0 && (
        <span className="relative text-sand-300">
          &#9733;
          <span
            className="absolute inset-0 overflow-hidden text-amber-500"
            style={{ width: `${partial * 100}%` }}
          >
            &#9733;
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-sand-300">&#9733;</span>
      ))}
    </span>
  )
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brick-100 text-brick-700">
      {label}
    </span>
  )
}

function SpecialtyPill({ text }: { text: string }) {
  return (
    <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-sand-100 text-sand-700 border border-sand-200">
      {text}
    </span>
  )
}

function CertPill({ text }: { text: string }) {
  return (
    <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-info-light text-info border border-blue-200">
      {text}
    </span>
  )
}

function HiredBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-success-light text-success">
      Hired <Check size={12} />
    </span>
  )
}

/* --- Hired Team Card (compact horizontal) --- */
function HiredCard({ vendor, onTap }: { vendor: Vendor; onTap: () => void }) {
  return (
    <button
      onClick={onTap}
      className="flex items-center gap-3 w-full bg-white border border-sand-200 rounded-lg p-3 text-left transition-all active:scale-[0.98]"
    >
      <img
        src={vendor.photo}
        alt={vendor.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-sand-950 truncate">{vendor.name}</p>
        <p className="text-[12px] text-sand-600">{vendor.categoryLabel}</p>
      </div>
      <HiredBadge />
    </button>
  )
}

/* --- Vendor Card (Thumbtack-style) --- */
function VendorCard({ vendor, onTap }: { vendor: Vendor; onTap: () => void }) {
  const visibleSpecialties = vendor.specialties.slice(0, 3)

  return (
    <button
      onClick={onTap}
      className="flex gap-3 w-full bg-white border border-sand-200 rounded-lg p-3.5 text-left transition-all active:scale-[0.98] hover:border-sand-300"
    >
      {/* Avatar */}
      <img
        src={vendor.photo}
        alt={vendor.name}
        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 mt-0.5"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Row 1: Name + category */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[16px] font-bold text-sand-950 leading-tight">{vendor.name}</span>
          <CategoryBadge label={vendor.categoryLabel} />
          {vendor.hired && <HiredBadge />}
        </div>

        {/* Row 2: Rating + location */}
        <div className="flex items-center gap-2 mt-1 text-[13px] text-sand-600">
          <span className="flex items-center gap-0.5 text-sand-900 font-semibold">
            <span className="text-amber-500">&#9733;</span> {vendor.rating}
          </span>
          <span className="text-sand-400">·</span>
          <span>{vendor.reviewCount} reviews</span>
          <span className="text-sand-400">·</span>
          <span>{vendor.location}</span>
          {vendor.distance && (
            <>
              <span className="text-sand-400">·</span>
              <span>{vendor.distance}</span>
            </>
          )}
        </div>

        {/* Row 3: Rate */}
        <div className="mt-1.5">
          <span className="text-[18px] font-extrabold text-brick-700">{vendor.rate}</span>
          <span className="text-[13px] text-sand-500 font-medium">{vendor.rateUnit}</span>
        </div>

        {/* Row 4: Specialties */}
        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
          {visibleSpecialties.map((s) => (
            <SpecialtyPill key={s} text={s} />
          ))}
          {vendor.specialties.length > 3 && (
            <span className="text-[11px] text-sand-500 font-medium">+{vendor.specialties.length - 3}</span>
          )}
        </div>

        {/* Row 5: Availability / response */}
        <div className="flex items-center gap-3 mt-1.5 text-[12px]">
          {!vendor.available && vendor.availableDates ? (
            <span className="text-sand-500 italic">{vendor.availableDates}</span>
          ) : (
            <span className="flex items-center gap-1 text-success font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              Available
            </span>
          )}
          <span className="text-sand-400">·</span>
          <span className="text-sand-600">Responds {vendor.responseTime.toLowerCase()}</span>
        </div>
      </div>
    </button>
  )
}

/* --- Vendor Profile Panel --- */
function VendorProfile({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  return (
    <SlideUpPanel open={true} onClose={onClose} fullHeight>
      <div className="px-5 pt-4 pb-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src={vendor.photo}
            alt={vendor.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-[20px] font-extrabold text-sand-950 leading-tight">{vendor.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <CategoryBadge label={vendor.categoryLabel} />
              {vendor.hired && <HiredBadge />}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[14px]">
              <StarRating rating={vendor.rating} size={16} />
              <span className="font-bold text-sand-900">{vendor.rating}</span>
              <span className="text-sand-500">({vendor.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Hired badge */}
        {vendor.hired && (
          <div className="mt-4 bg-success-light border border-green-200 rounded-lg p-3 flex items-center gap-2">
            <Check size={18} className="text-success flex-shrink-0" />
            <div>
              <p className="text-[14px] font-bold text-success">Hired for this meet</p>
              <p className="text-[12px] text-green-700">Confirmed and ready for April 12</p>
            </div>
          </div>
        )}

        {/* Rate */}
        <div className="mt-5 bg-brick-50 rounded-lg p-4 text-center">
          <span className="text-[28px] font-extrabold text-brick-700">{vendor.rate}</span>
          <span className="text-[16px] text-brick-600 font-medium">{vendor.rateUnit}</span>
        </div>

        {/* Bio */}
        <div className="mt-5">
          <h3 className="text-[14px] font-bold text-sand-900 uppercase tracking-wide mb-2">About</h3>
          <p className="text-[15px] text-sand-800 leading-relaxed">{vendor.bio}</p>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatBox label="Experience" value={`${vendor.yearsExperience} yrs`} />
          <StatBox label="Distance" value={vendor.distance || 'Local'} />
          <StatBox label="Response Time" value={vendor.responseTime} />
          <StatBox label="Travel Range" value={vendor.willTravel} />
        </div>

        {/* Specialties */}
        <div className="mt-5">
          <h3 className="text-[14px] font-bold text-sand-900 uppercase tracking-wide mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-1.5">
            {vendor.specialties.map((s) => (
              <SpecialtyPill key={s} text={s} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        {vendor.certifications.length > 0 && (
          <div className="mt-4">
            <h3 className="text-[14px] font-bold text-sand-900 uppercase tracking-wide mb-2">Certifications</h3>
            <div className="flex flex-wrap gap-1.5">
              {vendor.certifications.map((c) => (
                <CertPill key={c} text={c} />
              ))}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="mt-5">
          <h3 className="text-[14px] font-bold text-sand-900 uppercase tracking-wide mb-2">Availability</h3>
          {vendor.available ? (
            <div className="flex items-center gap-2 bg-success-light rounded-md p-3">
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              <span className="text-[14px] font-semibold text-success">Available for bookings</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-sand-100 rounded-md p-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sand-400" />
              <span className="text-[14px] font-medium text-sand-600">
                {vendor.availableDates || 'Currently unavailable'}
              </span>
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h3 className="text-[14px] font-bold text-sand-900 uppercase tracking-wide mb-3">
            Reviews ({vendor.reviews.length})
          </h3>
          <div className="space-y-3">
            {vendor.reviews.map((review, i) => (
              <div key={i} className="bg-sand-50 rounded-lg p-3.5 border border-sand-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-bold text-sand-900">{review.author}</span>
                  <span className="text-[12px] text-sand-500">{review.date}</span>
                </div>
                <StarRating rating={review.rating} size={13} />
                <p className="text-[14px] text-sand-700 leading-relaxed mt-1.5">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 py-3.5 rounded-lg border-2 border-brick-700 text-brick-700 font-bold text-[15px] transition-all active:scale-[0.97]">
            Contact
          </button>
          <button className="flex-1 py-3.5 rounded-lg bg-brick-700 text-white font-bold text-[15px] transition-all active:scale-[0.97]">
            Book Now
          </button>
        </div>
      </div>
    </SlideUpPanel>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sand-50 rounded-lg p-3 text-center border border-sand-100">
      <p className="text-[12px] text-sand-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-[15px] font-bold text-sand-900 mt-0.5">{value}</p>
    </div>
  )
}

/* ===== Main Export ===== */

export function VendorView() {
  const [activeCategory, setActiveCategory] = useState<VendorCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  const hiredVendors = useMemo(() => vendors.filter((v) => v.hired), [])

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      if (activeCategory !== 'all' && v.category !== activeCategory) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          v.name.toLowerCase().includes(q) ||
          v.categoryLabel.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.specialties.some((s) => s.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [activeCategory, searchQuery])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: vendors.length }
    for (const v of vendors) {
      counts[v.category] = (counts[v.category] || 0) + 1
    }
    return counts
  }, [])

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-[22px] font-extrabold text-sand-950 leading-tight">Vendor Marketplace</h1>
        <p className="text-[14px] text-sand-600 mt-0.5">Find and book professionals for your meet</p>
      </div>

      {/* Category pills — horizontal scroll */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all
                  ${active
                    ? 'bg-brick-700 text-white shadow-sm'
                    : 'bg-sand-100 text-sand-700 border border-sand-200'
                  }
                `}
              >
                {cat.label}
                <span className={`ml-1.5 text-[11px] ${active ? 'text-brick-200' : 'text-sand-500'}`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sand-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search vendors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-sand-50 border border-sand-200 text-[14px] text-sand-900 placeholder:text-sand-400 focus:outline-none focus:border-brick-400 focus:ring-2 focus:ring-brick-100 transition-all"
            />
          </div>
          <button className="flex-shrink-0 w-10 h-10 rounded-lg bg-sand-100 border border-sand-200 flex items-center justify-center text-sand-600 transition-all active:scale-95">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="16" y2="18" />
              <circle cx="6" cy="6" r="2" fill="currentColor" />
              <circle cx="10" cy="12" r="2" fill="currentColor" />
              <circle cx="6" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Your Team — hired vendors */}
      {hiredVendors.length > 0 && (
        <div className="px-4 pb-4">
          <h2 className="text-[13px] font-bold text-sand-600 uppercase tracking-wide mb-2">Your Team</h2>
          <div className="space-y-2">
            {hiredVendors.map((v) => (
              <HiredCard key={v.id} vendor={v} onTap={() => setSelectedVendor(v)} />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-sand-200 mx-4 mb-4" />

      {/* Browse section header */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <h2 className="text-[13px] font-bold text-sand-600 uppercase tracking-wide">
          {activeCategory === 'all' ? 'All Vendors' : categories.find((c) => c.id === activeCategory)?.label}
          <span className="ml-1.5 text-sand-400 font-semibold">({filteredVendors.length})</span>
        </h2>
        <button className="text-[12px] font-semibold text-brick-700">Sort: Rating ↓</button>
      </div>

      {/* Vendor list */}
      <div className="px-4 space-y-3">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((v) => (
            <VendorCard key={v.id} vendor={v} onTap={() => setSelectedVendor(v)} />
          ))
        ) : (
          <div className="py-12 text-center">
            <div className="flex justify-center mb-2">
              <SearchX size={32} className="text-sand-400" />
            </div>
            <p className="text-[16px] font-bold text-sand-700">No vendors found</p>
            <p className="text-[14px] text-sand-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Vendor profile panel */}
      {selectedVendor && (
        <VendorProfile vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
      )}

      {/* Hide-scrollbar utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
