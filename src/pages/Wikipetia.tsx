import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import dog1 from '../assets/dogs/dog1.jpg';
import dog2 from '../assets/dogs/dog2.jpg';
import dog3 from '../assets/dogs/dog3.jpg';
import dog4 from '../assets/dogs/dog4.jpg';
import dog5 from '../assets/dogs/dog5.jpg';
import dog6 from '../assets/dogs/dog6.jpg';
import dog7 from '../assets/dogs/dog7.jpg';
import dog8 from '../assets/dogs/dog8.jpg';

import cat1 from '../assets/cats/cat1.jpg';
import cat2 from '../assets/cats/cat2.jpg';
import cat3 from '../assets/cats/cat3.jpg';
import cat4 from '../assets/cats/cat4.jpg';
import cat5 from '../assets/cats/cat5.jpg';
import cat6 from '../assets/cats/cat6.jpg';
import cat7 from '../assets/cats/cat7.jpg';
import cat8 from '../assets/cats/cat8.jpg';

const Wikipetia = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [imageType, setImageType] = useState('random'); // Options: 'dogs', 'cats', or 'random'

  const dogImages = [dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8];
  const catImages = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];


  const getImageUrl = (index) => {
    if (imageType === 'dogs') {
      return dogImages[index];
    } else if (imageType === 'cats') {
      return catImages[index];
    }
    // For random, use an external service.
    return `https://picsum.photos/500/280?random=${index}`;
  };

  const handleSearch = () => {
    const dummyResults = Array(8)
      .fill(null)
      .map((_, index) => ({
        title: `${index + 1}. Artigo sobre ${query}`,
        snippet: `Este é o resultado número ${index + 1} para "${query}". ${
          imageType === 'dogs'
            ? '🐶'
            : imageType === 'cats'
            ? '🐱'
            : '🎲'
        } Imagens relacionadas ao tema.`,
        url: '#',
        image: getImageUrl(index)
      }));
    setResults(dummyResults);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="font-sans">
      <Header />
      <main className="bg-orange-200 min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Bem-vindo ao Wikipetia 🐶🐱
        </h1>

        {/* Image Type Selector */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setImageType('dogs')}
            className={`px-4 py-2 rounded-lg ${
              imageType === 'dogs'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Cães 🐶
          </button>
          <button
            onClick={() => setImageType('cats')}
            className={`px-4 py-2 rounded-lg ${
              imageType === 'cats'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Gatos 🐱
          </button>
          <button
            onClick={() => setImageType('random')}
            className={`px-4 py-2 rounded-lg ${
              imageType === 'random'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Dúvidas Diversas 🎲
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex gap-2"
        >
          <input
            type="text"
            placeholder="Digite o que você precisa saber..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-2 rounded-lg border border-gray-700 text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </form>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-8 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Resultados para "{query}" (
              {imageType === 'dogs'
                ? 'Cães'
                : imageType === 'cats'
                ? 'Gatos'
                : 'Aleatório'}
              )
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/500x280';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">
                      {result.title}
                    </h3>
                    <p className="text-gray-700">
                      {result.snippet}
                    </p>
                    <a
                      href={result.url}
                      className="text-blue-500 hover:underline mt-2 block"
                    >
                      Leia mais →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          to="/"
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Voltar para Home
        </Link>
      </main>
    </div>
  );
};

export default Wikipetia;
