import Header from '../components/Header';
import Carousel from '../components/Carousel';
//import map from "../assets/map.png"
import calendario from "../assets/calendario.png"
import { useEffect, useState } from 'react';
import LeafletMap from '../components/Map';
import SimpleMap from '../components/SimpleMap';

export interface Clinic{
  name: string,
  lat: number,
  lng: number
}

export interface Location{
  lat: number,
  lng: number
}

const clinics : Clinic[] = [
  { name: 'Clínica Sanavet', lat: -22.0077978, lng: -47.9023929 },
  { name: 'Clínica SpecialeVet', lat: -22.0097872, lng: -47.9283138 },
  { name: 'CSC Hospital Veterinário', lat: -22.0097872, lng: -47.9283138 },
  { name: 'SamuVet 24 Horas', lat: -22.0072407, lng: -47.932777 }
];

const Home = () => {

  const [userLocation, setUserLocation] = useState<Location>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="font-sans">
      <Header />
      <main className="bg-orange-200">
        <Carousel />

        {/* Mapa Section */}
        <section className="flex-1 bg-[#FFE8C9] rounded-lg max-w-4xl mx-auto px-8 pt-4 pb-8 mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Veja os serviços próximos:</h2>
          <div className="flex flex-col md:flex-row md:items-start justify-center gap-8">
            <div className="flex justify-center">
              <div className="w-full max-w-[480px]">
               {userLocation ? (
                <div className="h-full rounded-lg text-orange-200">
                  <LeafletMap userLocation={userLocation} clinics={clinics} />
                </div>
               ) : (
                <div className="">
                  Carregando mapa...
                </div>
               )}
              </div>
            </div>
            <div className="md:w-1/3">
              <ul className="space-y-2">
                {['Clínica Sanavet', 'Clínica SpecialeVet', 'CSC Hospital Veterinário', 'SamuVet 24 Horas'].map((item, index) => (
                  <li key={index} className="bg-[#3B94FC] text-white px-6 py-3 rounded hover:bg-opacity-90 transition text-lg font-semibold shadow-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Calendário Section */}
        <section className="flex-1 bg-[#FFE8C9] rounded-lg max-w-4xl mx-auto px-8 pt-4 pb-8 mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Organize seu pet:</h2>
          <div className="flex flex-col md:flex-row md:items-start justify-center gap-8">
            <div className="md:w-1/3 mt-6">
              <p className="bg-[#3B94FC] text-white px-6 py-3 rounded hover:bg-opacity-90 transition text-lg font-semibold shadow-lg">
                Com a ajuda do nosso calendário inteligente, acompanhe todas as datas mais importantes do seu pet! Vacinações recorrentes, consultas, aniversário, e muito mais em um só lugar!
              </p>
            </div>
            <div className="flex justify-center">
              <img src={calendario} alt="Calendário" className="w-full h-auto object-cover max-w-[480px] rounded-lg" />
            </div>
          </div>
        </section>

        <div className='pt-20'/>
        <div className='flex justify-center pb-8'>
          <div className='bg-[#FFE8C9] p-2 rounded-2xl mx-2'>
            Pets Organizados LLC. © é uma empresa do grupo WLP Holdings. Copyright @ 2024-2025
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
