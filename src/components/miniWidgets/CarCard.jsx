import React, { useEffect, useState } from "react";
import { Button, Chip } from "@mui/material";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
const CarCard = ({ car }) => {
  const [carImage, setCarImage] = useState("/images/categories/car_01.avif");
  useEffect(() => {
    setCarImage(
      Array.isArray(car.images) && car.images.length > 0
        ? car.images[0]
        : car.image || "/images/categories/car_01.avif"
    );
  }, []);
  // console.log("car images", car.images[0]);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden w-[100%] ">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={carImage}
          alt={car.brand || "Car"}
          className="w-full h-48 object-cover "
          width={200}
          height={200}
        />
        <Chip
          label="New Arrival"
          color="success"
          size="small"
          className="absolute top-3 left-3"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {car.categoryName}
        </h3>
        {/* Details Section */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
          <span>🚗 Auto</span>
          <span>👨‍👩‍👧‍👦 {car.capacity} Persons</span>
          <span>📅 {car.year}</span>
          <span>⛽ {car.fuelType}</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-black">
            ${car.pricePerDay} / Day
          </span>
          <Button variant="contained" color="error" className="text-white">
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
