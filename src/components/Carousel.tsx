import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'


const Carousel = () => {
  const slides = [
    { src: img1, alt: 'Carousel Image 1' },
    { src: img2, alt: 'Carousel Image 2' },
    { src: img3, alt: 'Carousel Image 3' },
  ];
  const intervalTime = 5000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef<number | undefined>(undefined);

  const updateSlide = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    updateSlide((currentIndex + 1) % slides.length);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, intervalTime);
    return () => clearInterval(slideInterval.current);
  }, [currentIndex]);

  return (
    <section className="relative w-full h-96 overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${i === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-30 pointer-events-none"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link to="/login" className="bg-blue-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition text-lg font-semibold shadow-lg">
          Crie uma conta
        </Link>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearInterval(slideInterval.current);
              updateSlide(i);
            }}
            className={`w-3 h-3 rounded-full transition focus:outline-none ${i === currentIndex ? 'bg-white bg-opacity-100' : 'bg-white bg-opacity-50'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
