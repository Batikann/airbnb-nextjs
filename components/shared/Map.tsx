'use client'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/constants'
import { icon } from 'leaflet'
const ICON = icon({
  iconUrl:
    'https://bacamak.com.tr/wp-content/uploads/2019/06/678111-map-marker-512.png',
  iconSize: [50, 50],
})

const Map = ({ locationValue }: { locationValue: string }) => {
  const { getCountryByValue } = useCountries()
  const lang = getCountryByValue(locationValue)?.latLang

  return (
    <>
      <MapContainer
        scrollWheelZoom={false}
        className="h-[50vh] rounded-lg relative z-0"
        center={lang ?? [52.505, -0.09]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker icon={ICON} position={lang ?? [52.505, -0.09]} />
      </MapContainer>
    </>
  )
}
export default Map
