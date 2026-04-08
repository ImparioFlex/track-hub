import { useState, useMemo } from 'react'
import { vendors, type Vendor, type VendorCategory } from '../data/vendors'
import { SlideUpPanel } from '../components/SlideUpPanel'
import { SlideDownPanel } from '../components/SlideDownPanel'
import { Check, Search, SearchX, SlidersHorizontal, Star, MapPin, Clock, Briefcase, ChevronDown } from 'lucide-react'

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
    <span className="inline-block text-[12px] font-medium px-2.5 py-1 rounded-full bg-sand-100 text-sand-700 border border-sand-200">
      {text}
    </span>
  )
}

function CertPill({ text }: { text: string }) {
  return (
    <span className="inline-block text-[12px] font-medium px-2.5 py-1 rounded-full bg-info-light text-info border border-blue-200">
      {text}
    </span>
  )
}

function HiredBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-success-light text-success">
      Hired <Check size={12} />
    </span>
  )
}

/* ─── Stat Pill (Oripio-inspired) ─── */
function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-brick-50 border border-brick-100 rounded-xl px-3 py-2.5 min-w-0 flex-1">
      <span className="text-brick-600">{icon}</span>
      <span className="text-[15px] font-bold text-sand-950 leading-none">{value}</span>
      <span className="text-[11px] text-sand-500 font-medium leading-none">{label}</span>
    </div>
  )
}

/* ─── Hired Team Card (compact horizontal) ─── */
function HiredCard({ vendor, onTap }: { vendor: Vendor; onTap: () => void }) {
  return (
    <button
      onClick={onTap}
      className="flex items-center gap-3 w-full bg-white border border-sand-200 rounded-xl p-3.5 text-left transition-all active:scale-[0.98] shadow-sm"
    >
      <img
        src={vendor.photo}
        alt={vendor.name}
        className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-success/20"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-sand-950 truncate">{vendor.name}</p>
        <p className="text-[13px] text-sand-600">{vendor.categoryLabel}</p>
      </div>
      <HiredBadge />
    </button>
  )
}

/* ─── Vendor Card (upgraded) ─── */
function VendorCard({ vendor, onTap }: { vendor: Vendor; onTap: () => void }) {
  const visibleSpecialties = vendor.specialties.slice(0, 2)

  return (
    <button
      onClick={onTap}
      className="w-full bg-white border border-sand-200 rounded-xl p-4 text-left transition-all active:scale-[0.98] hover:border-sand-300 overflow-hidden shadow-sm"
    >
      {/* Top row: Avatar + name + badge */}
      <div className="flex items-center gap-3">
        <img
          src={vendor.photo}
          alt={vendor.name}
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-sand-950 leading-tight truncate">{vendor.name}</span>
            {vendor.hired && <HiredBadge />}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-[13px] text-sand-600">
            <CategoryBadge label={vendor.categoryLabel} />
            <span className="text-sand-400">·</span>
            <span className="truncate">{vendor.location}</span>
            {vendor.distance && (
              <>
                <span className="text-sand-400">·</span>
                <span className="flex-shrink-0">{vendor.distance}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Rating + Rate row */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5 text-[14px]">
          <span className="flex items-center gap-0.5 text-sand-900 font-semibold">
            <span className="text-amber-500">&#9733;</span> {vendor.rating}
          </span>
          <span className="text-sand-400">·</span>
          <span className="text-sand-600">{vendor.reviewCount} reviews</span>
        </div>
        <div>
          <span className="text-[18px] font-extrabold text-brick-700">{vendor.rate}</span>
          <span className="text-[13px] text-sand-500 font-medium">{vendor.rateUnit}</span>
        </div>
      </div>

      {/* Specialties + availability */}
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {visibleSpecialties.map((s) => (
            <SpecialtyPill key={s} text={s} />
          ))}
          {vendor.specialties.length > 2 && (
            <span className="text-[12px] text-sand-500 font-medium flex-shrink-0">+{vendor.specialties.length - 2}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[12px] flex-shrink-0 ml-2">
          {!vendor.available && vendor.availableDates ? (
            <span className="text-sand-500">{vendor.availableDates}</span>
          ) : (
            <span className="flex items-center gap-1 text-success font-semibold">
              <span className="w-2 h-2 rounded-full bg-success inline-block" />
              Available
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

/* ─── Vendor Profile Panel (Full-Bleed Header) ─── */
function VendorProfile({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  return (
    <SlideUpPanel open={true} onClose={onClose} fullHeight>
      {/* Full-bleed gradient header with photo */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-b from-brick-700 via-brick-600 to-brick-50 pt-6 pb-16 px-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CategoryBadge label={vendor.categoryLabel} />
              {vendor.hired && <HiredBadge />}
            </div>
            <div className="text-right">
              {vendor.available ? (
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white/90">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Available
                </span>
              ) : (
                <span className="text-[12px] text-white/70">{vendor.availableDates || 'Unavailable'}</span>
              )}
            </div>
          </div>
          <div className="flex items-end gap-4">
            <img
              src={vendor.photo}
              alt={vendor.name}
              className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 border-4 border-white/20 shadow-lg"
            />
            <div className="flex-1 min-w-0 pb-1">
              <h2 className="text-[22px] font-extrabold text-white leading-tight">{vendor.name}</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <StarRating rating={vendor.rating} size={16} />
                <span className="font-bold text-white/90 text-[14px]">{vendor.rating}</span>
                <span className="text-white/60 text-[13px]">({vendor.reviewCount})</span>
              </div>
              <p className="text-[13px] text-white/70 mt-1 flex items-center gap-1">
                <MapPin size={12} />
                {vendor.location} {vendor.distance && `· ${vendor.distance}`}
              </p>
            </div>
          </div>
        </div>

        {/* Rate card overlapping the gradient */}
        <div className="mx-5 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-md border border-sand-100 p-4 text-center">
            <span className="text-[32px] font-extrabold text-brick-700">{vendor.rate}</span>
            <span className="text-[16px] text-sand-500 font-medium ml-1">{vendor.rateUnit}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-6">
        {/* Hired confirmation */}
        {vendor.hired && (
          <div className="mb-5 bg-success-light border border-green-200 rounded-xl p-3.5 flex items-center gap-2.5">
            <Check size={18} className="text-success flex-shrink-0" />
            <div>
              <p className="text-[15px] font-bold text-success">Hired for this meet</p>
              <p className="text-[13px] text-green-700">Confirmed and ready for April 12</p>
            </div>
          </div>
        )}

        {/* Stat pills row (Oripio-inspired) */}
        <div className="flex gap-2.5 mb-5">
          <StatPill icon={<Briefcase size={16} />} value={`${vendor.yearsExperience} yrs`} label="Experience" />
          <StatPill icon={<Star size={16} />} value={`${vendor.rating}`} label="Rating" />
          <StatPill icon={<MapPin size={16} />} value={vendor.distance || 'Local'} label="Distance" />
          <StatPill icon={<Clock size={16} />} value={vendor.responseTime} label="Response" />
        </div>

        {/* Bio */}
        <div className="mb-5">
          <h3 className="text-[13px] font-bold text-sand-900 uppercase tracking-wider mb-2">About</h3>
          <p className="text-[15px] text-sand-800 leading-relaxed">{vendor.bio}</p>
        </div>

        {/* Specialties */}
        <div className="mb-5">
          <h3 className="text-[13px] font-bold text-sand-900 uppercase tracking-wider mb-2.5">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {vendor.specialties.map((s) => (
              <SpecialtyPill key={s} text={s} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        {vendor.certifications.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[13px] font-bold text-sand-900 uppercase tracking-wider mb-2.5">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {vendor.certifications.map((c) => (
                <CertPill key={c} text={c} />
              ))}
            </div>
          </div>
        )}

        {/* Travel Range */}
        <div className="mb-5 bg-sand-50 rounded-xl p-4 border border-sand-100">
          <div className="text-[12px] text-sand-500 font-semibold uppercase tracking-wider mb-1">Travel Range</div>
          <div className="text-[16px] font-bold text-sand-950">{vendor.willTravel}</div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h3 className="text-[13px] font-bold text-sand-900 uppercase tracking-wider mb-3">
            Reviews ({vendor.reviews.length})
          </h3>
          <div className="space-y-3">
            {vendor.reviews.map((review, i) => (
              <div key={i} className="bg-sand-50 rounded-xl p-4 border border-sand-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[14px] font-bold text-sand-900">{review.author}</span>
                  <span className="text-[12px] text-sand-500">{review.date}</span>
                </div>
                <StarRating rating={review.rating} size={13} />
                <p className="text-[14px] text-sand-700 leading-relaxed mt-2">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-4 rounded-xl border-2 border-brick-700 text-brick-700 font-bold text-[16px] transition-all active:scale-[0.97]">
            Contact
          </button>
          <button className="flex-1 py-4 rounded-xl bg-brick-700 text-white font-bold text-[16px] transition-all active:scale-[0.97] shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </SlideUpPanel>
  )
}

/* ===== Main Export ===== */

export function VendorView() {
  const [activeCategory, setActiveCategory] = useState<VendorCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating')

  const hiredVendors = useMemo(() => vendors.filter((v) => v.hired), [])

  const filteredVendors = useMemo(() => {
    let result = vendors.filter((v) => {
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

    // Sort
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price') result.sort((a, b) => parseInt(a.rate.replace(/\D/g, '')) - parseInt(b.rate.replace(/\D/g, '')))

    return result
  }, [activeCategory, searchQuery, sortBy])

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
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-[24px] font-extrabold text-sand-950 leading-tight">Vendor Marketplace</h1>
        <p className="text-[15px] text-sand-600 mt-1">Find and book professionals for your meet</p>
      </div>

      {/* Category pills — horizontal scroll */}
      <div className="px-5 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all
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
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search vendors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-[15px] text-sand-900 placeholder:text-sand-400 focus:outline-none focus:border-brick-400 focus:ring-2 focus:ring-brick-100 transition-all"
            />
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-sand-100 border border-sand-200 flex items-center justify-center text-sand-600 transition-all active:scale-95"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Your Team — hired vendors */}
      {hiredVendors.length > 0 && (
        <div className="px-5 pb-5">
          <h2 className="text-[13px] font-bold text-sand-600 uppercase tracking-wider mb-2.5">Your Team</h2>
          <div className="space-y-2.5">
            {hiredVendors.map((v) => (
              <HiredCard key={v.id} vendor={v} onTap={() => setSelectedVendor(v)} />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-sand-200 mx-5 mb-5" />

      {/* Browse section header */}
      <div className="px-5 pb-3 flex items-center justify-between">
        <h2 className="text-[13px] font-bold text-sand-600 uppercase tracking-wider">
          {activeCategory === 'all' ? 'All Vendors' : categories.find((c) => c.id === activeCategory)?.label}
          <span className="ml-1.5 text-sand-400 font-semibold">({filteredVendors.length})</span>
        </h2>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-1 text-[13px] font-semibold text-brick-700"
        >
          Sort: {sortBy === 'rating' ? 'Rating' : sortBy === 'distance' ? 'Distance' : 'Price'} <ChevronDown size={14} />
        </button>
      </div>

      {/* Vendor list */}
      <div className="px-5 space-y-3">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((v) => (
            <VendorCard key={v.id} vendor={v} onTap={() => setSelectedVendor(v)} />
          ))
        ) : (
          <div className="py-12 text-center">
            <div className="flex justify-center mb-2">
              <SearchX size={32} className="text-sand-400" />
            </div>
            <p className="text-[17px] font-bold text-sand-700">No vendors found</p>
            <p className="text-[15px] text-sand-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Vendor profile panel */}
      {selectedVendor && (
        <VendorProfile vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
      )}

      {/* Slide-down filter panel */}
      <SlideDownPanel open={filterOpen} onClose={() => setFilterOpen(false)} title="Sort & Filter">
        <div className="px-5 py-4 space-y-5">
          {/* Sort options */}
          <div>
            <h3 className="text-[13px] font-bold text-sand-600 uppercase tracking-wider mb-3">Sort by</h3>
            <div className="space-y-2">
              {([
                { id: 'rating' as const, label: 'Highest Rated', desc: 'Top-rated vendors first' },
                { id: 'distance' as const, label: 'Nearest', desc: 'Closest to meet venue' },
                { id: 'price' as const, label: 'Lowest Price', desc: 'Most affordable first' },
              ]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setSortBy(opt.id); setFilterOpen(false) }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${
                    sortBy === opt.id
                      ? 'bg-brick-50 border-2 border-brick-300'
                      : 'bg-sand-50 border border-sand-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    sortBy === opt.id ? 'border-brick-700 bg-brick-700' : 'border-sand-300'
                  }`}>
                    {sortBy === opt.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-sand-950">{opt.label}</div>
                    <div className="text-[13px] text-sand-500">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <h3 className="text-[13px] font-bold text-sand-600 uppercase tracking-wider mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setFilterOpen(false) }}
                  className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brick-700 text-white'
                      : 'bg-sand-100 text-sand-700 border border-sand-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SlideDownPanel>
    </div>
  )
}
