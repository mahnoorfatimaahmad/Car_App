// components/ProductImage.js
"use client";
import Image from "next/image";
import { useState } from "react";

export const ProductImage = () => {
  const images = [
    "/images/car_01.webp",
    "/images/bg_01.webp",
    "/images/bg_02.webp",
    "/images/car_03.webp",
    "/images/car_05.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col border shawdow-lg ">
      {/* Main Image */}{" "}
      <h2 className="text-lg font-bold bg-black text-white py-2 px-4 rounded-t-lg">
        Listing Photo
      </h2>
      <div className="w-full px-4 h-64 mt-5 md:h-96 overflow-hidden ">
        <Image
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform rounded-lg duration-500"
          width={500}
          height={500}
        />
      </div>
      {/* Thumbnails */}
      <div className="mt-4 w-full flex gap-2 overflow-x-auto scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 w-28 h-20 border-2 ${
              currentImageIndex === index
                ? "border-blue-500"
                : "border-gray-300"
            } rounded-lg overflow-hidden`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// components/Specifications.js
export const Specifications = () => {
  const specs = [
    { icon: "🚗", label: "Nissan" },
    { icon: "⚙️", label: "Automatic" },
    { icon: "📏", label: "16 Km" },
    { icon: "📅", label: "2018" },
    { icon: "🛡️", label: "ABS" },
    { icon: "⛽", label: "Diesel" },
    { icon: "❄️", label: "Air Condition" },
    { icon: "🏎️", label: "3,000 (Hp)" },
  ];

  return (
    <div className="w-full bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold bg-black text-white py-2 px-4 rounded-t-lg">
        Specifications
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-b-lg">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-700 font-medium"
          >
            <span className="text-xl">{spec.icon}</span>
            <span>{spec.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
