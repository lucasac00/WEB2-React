import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const Carousel = () => {
  const slides = [
    { src: img1, alt: 'Carousel Image 1' },
    { src: img2, alt: 'Carousel Image 2' },
    { src: img3, alt: 'Carousel Image 3' },
  ];

  const intervalTime = 5000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the auto-slide interval
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, intervalTime);

    // Clear the interval on unmount
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    // Optionally clear interval so it stops auto-sliding
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-full h-96 overflow-hidden">
      {/* The 'track' of slides */}
      <div
        className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
        // Shift the entire track to show the current slide
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div className="w-full flex-shrink-0 relative" key={i}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay if desired */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: 'var(--color-gray-900)', opacity: 0.5 }}
            />
          </div>
        ))}
      </div>

      {/* "Crie uma conta" button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link
          to="/register"
          className="bg-[#3B94FC] text-white px-6 py-3 rounded hover:bg-opacity-90 hover:bg-blue-700 transition text-lg font-semibold shadow-lg"
        >
          Crie uma conta
        </Link>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition focus:outline-none ${
              i === currentIndex
                ? 'bg-white bg-opacity-100'
                : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
