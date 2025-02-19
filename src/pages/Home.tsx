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

        {/* Footer Section */}
        <footer id="footer" className="bg-[#3B94FC] text-white py-6 mt-16">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            {/* Contato */}
            <div>
              <h3 className="text-lg font-semibold">Contato</h3>
              <p>Telefone: (11) 98765-4321</p>
              <p>Email: contato@petsorganizados.com</p>
            </div>

            {/* Endereço */}
            <div>
              <h3 className="text-lg font-semibold">Endereço</h3>
              <p>Rod. Washington Luís, s/n - Monjolinho</p>
              <p>São Carlos, SP - Brasil</p>
            </div>
        
            {/* Redes Sociais */}
            <div>
              <h3 className="text-lg font-semibold">Siga-nos</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="#" className="hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.592 0 0 .593 0 1.326v21.348C0 23.406.592 24 1.325 24h21.349c.733 0 1.326-.594 1.326-1.326V1.326C24 .593 23.408 0 22.675 0zM7.548 20.508H3.683V9.125h3.865v11.383zM5.616 7.749c-1.237 0-2.243-1.006-2.243-2.243S4.379 3.263 5.616 3.263c1.238 0 2.243 1.006 2.243 2.243s-1.005 2.243-2.243 2.243zm14.892 12.759h-3.866v-5.52c0-1.313-.025-3.004-1.829-3.004-1.83 0-2.111 1.43-2.111 2.905v5.619h-3.865V9.125h3.71v1.551h.053c.516-.978 1.778-2.005 3.662-2.005 3.916 0 4.637 2.579 4.637 5.933v6.904z"/></svg>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557c-.885.392-1.83.656-2.828.775a4.92 4.92 0 0 0 2.165-2.717 9.865 9.865 0 0 1-3.127 1.196 4.916 4.916 0 0 0-8.385 4.482A13.949 13.949 0 0 1 1.64 3.15a4.916 4.916 0 0 0 1.523 6.573 4.9 4.9 0 0 1-2.23-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.934 4.934 0 0 1-2.224.084 4.919 4.919 0 0 0 4.596 3.417A9.867 9.867 0 0 1 0 21.542a13.94 13.94 0 0 0 7.548 2.213c9.056 0 14.01-7.506 14.01-14.01 0-.213-.004-.426-.014-.637A10.005 10.005 0 0 0 24 4.557z"/></svg>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.689v-3.622h3.131V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.505 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Home;
