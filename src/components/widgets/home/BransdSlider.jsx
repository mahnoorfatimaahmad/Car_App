import React from "react";
import Slider from "react-slick";
import Image from "next/image";

// React Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandSlider = () => {
  // Sample brand logos (replace paths with actual logos)
  const brands = [
    { id: 1, src: "/images/brands/classiccars.png", alt: "Classic Cars" },
    { id: 2, src: "/images/brands/luxurycars.png", alt: "Luxury Cars" },
    { id: 3, src: "/images/brands/classiccars.png", alt: "Classic Cars" },
    { id: 4, src: "/images/brands/luxurycars.png", alt: "Luxury Cars" },
    { id: 5, src: "/images/brands/bestwheels.png", alt: "Best Wheels" },
    { id: 6, src: "/images/brands/sportscars.png", alt: "Sports Cars" },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand.id} className="flex justify-center">
            <Image
              src={brand.src}
              alt={brand.alt}
              width={100}
              height={50}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandSlider;
