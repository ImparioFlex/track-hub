import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { VENUE_CENTER, VENUE_ZOOM, mapPins, type MapPin } from '../data/mapPins'
import { useEffect } from 'react'

function createMapIcon(pin: MapPin) {
  const abbr = pin.label.substring(0, 2).toUpperCase()
  return L.divIcon({
    html: `<div style="
      font-size: 12px;
      font-weight: 700;
      color: white;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${pin.color};
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      letter-spacing: -0.02em;
    ">${abbr}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
    className: '',
  })
}

function MapResizer() {
  const map = useMap()
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100)
  }, [map])
  return null
}

interface VenueMapProps {
  highlightPin?: string
  filterCategory?: string
  height?: string
}

export function VenueMap({ highlightPin, filterCategory, height = '100%' }: VenueMapProps) {
  const filteredPins = filterCategory
    ? mapPins.filter(p => p.category === filterCategory)
    : mapPins

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={VENUE_CENTER}
        zoom={VENUE_ZOOM}
        style={{ height: '100%', width: '100%', borderRadius: '0' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapResizer />
        {filteredPins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={createMapIcon(pin)}
            opacity={highlightPin && highlightPin !== pin.id ? 0.4 : 1}
          >
            <Popup>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>
                  {pin.label}
                </div>
                <div style={{ color: '#6b645d', fontSize: '13px', lineHeight: 1.5 }}>
                  {pin.description}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
