import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Clinic, Location } from '../pages/Home';
import { useEffect } from 'react';

// Fix leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  userLocation: Location;
  clinics: Clinic[];
  selectedClinicLocation: Location | null;
}

// Component to change the map center
const ChangeMapCenter = ({ location }: { location: Location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 15);
    }
  }, [location, map]);

  return null;
};

const LeafletMap = ({ userLocation, clinics, selectedClinicLocation }: MapProps) => {
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
      
      {/* Update map center when clinic is selected */}
      {selectedClinicLocation && <ChangeMapCenter location={selectedClinicLocation} />}
      
      {/* User location marker */}
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Clinic markers */}
      {clinics.map((clinic, index) => (
        <Marker key={index} position={[clinic.lat, clinic.lng]}>
          <Popup>{clinic.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
