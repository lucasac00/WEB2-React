import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Clinic, Location } from '../pages/Home';

// Add missing marker configuration
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet marker icons
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface mapProps {
    userLocation: Location,
    clinics: Clinic[]
}

const LeafletMap = ({ userLocation, clinics } : mapProps) => {
  console.log('Map component rendered with:', userLocation);
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={15}
      style={{ height: '400px', width: '500px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
      {clinics.map((clinic, index) => (
        <Marker key={index} position={[clinic.lat, clinic.lng]}>
          <Popup>{clinic.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;