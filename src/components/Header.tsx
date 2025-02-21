import { useState } from 'react';
import { Link } from 'react-router';
import criatura from '../assets/criatura.png';

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedUser(null);
  };

  return (
    <header className="w-full bg-[#3B94FC] text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <div className="flex-shrink-0">
            <img src={criatura} alt="Logo" className="h-10 w-auto" />
          </div>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-gray-200">Serviços</a>
            <a href="#" className="hover:text-gray-200">Mapa</a>
            <a href="#" className="hover:text-gray-200">Agenda</a>
            <Link to="/wikipetia" className="hover:text-gray-200">Wikipetia</Link>
            <a href="#" className="hover:text-gray-200">Contato</a>
          </nav>
        </div>
        <div>
          {loggedUser && loggedUser.loggedIn ? (
            <button 
              onClick={handleLogout} 
              className="border border-white px-4 py-2 rounded hover:bg-white hover:bg-opacity-10 hover:text-blue-700 transition"
            >
              {loggedUser.email}
            </button>
          ) : (
            <Link 
              to="/login" 
              className="border border-white px-4 py-2 rounded hover:bg-white hover:bg-opacity-10 hover:text-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {mobileNavOpen && (
        <div className="md:hidden bg-[#3B94FC] text-white px-4 pt-2 pb-4 flex flex-col space-y-2">
          <a href="#" className="block hover:text-gray-200">Serviços</a>
          <a href="#" className="block hover:text-gray-200">Mapa</a>
          <a href="#" className="block hover:text-gray-200">Agenda</a>
          <Link to="/wikipetia" className="block hover:text-gray-200">Wikipetia</Link>
          <a href="#" className="block hover:text-gray-200">Contato</a>
        </div>
      )}
    </header>
  );
};

export default Header;
