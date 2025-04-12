import React, { useState, useEffect } from "react";

const AdvertisingSlides = () => {
  const slides = [
    {
      id: 1,
      content: "Dune-awakening",
      image: "dune-awakening-2025-3840x2160-21352.jpg",
    },
    {
      id: 2,
      content: "assasians-cred",
      image: "assassins-creed-3840x2160-21615.jpg",
    },
    {
      id: 3,
      content: "atomfall",
      image: "atomfall-key-art-3840x2160-21620.png",
    },
    {
      id: 4,
      content: "clairobscur",
      image: "clair-obscur-3840x2160-20843.jpg",
    },
    { id: 5, content: "daysgone", image: "days-gone-5120x2880-21611.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container bg-gray-100 relative overflow-hidden h-screen w-screen">
      <div
        className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-full bg-indigo-600 text-white flex items-center justify-center"
          >
            <img
              src={slide.image}
              alt={slide.content}
              className="w-full h-full object-cover"
            />
            <h1
              className="absolute text-8xl text-grey-300 


"
            >
              {slide.content}
            </h1>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black px-4 py-2 rounded shadow"
      >
        &#9664;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black px-4 py-2 rounded shadow"
      >
        &#9654;
      </button>

      <div className="absolute bottom-8 w-full flex justify-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full mx-2 cursor-pointer ${
              currentIndex === index ? "bg-indigo-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisingSlides;
