"use client";
import React, { useState, useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import CarCard from "@/components/miniWidgets/CarCard";
import { useCarContext } from "@/contextApi/CarContext";
import { Pagination } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
const CarListings = () => {
  const {
    inventory,
    forFilteredInventory,
    setInventory,
    setForFilteredInventory,
  } = useCarContext();

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      offset: 100, // Offset from the top before animation starts
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const cate = Array.from(new Set(inventory?.map((car) => car.category)));
    console.log("categories in inventory", cate);
    setCategories(["All", ...cate]);
  }, [inventory]);
  const handleFilter = (category) => {
    if (category === "All") {
      setForFilteredInventory(inventory);
    } else {
      const filteredCars = inventory.filter((car) => car.category == category);
      setForFilteredInventory(filteredCars);
    }
    setActiveCategory(category);

    setCurrentPage(1);
  };

  // Calculate Paginated Items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return forFilteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  }, [forFilteredInventory, currentPage]);
  return (
    <div className="p-4 my-8">
      <div className="text-center mb-6">
        <p>Lorem Ipsum is simply dummy text</p>
        <h2 className="text-3xl font-bold mb-4">
          Lorem Ipsum is{" "}
          <span className=" text-red-500 ">Simply Dummy Text</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, i) => (
            <Button
              data-aos="zoom-out"
              delay={200 * i}
              key={category}
              variant="contained"
              onClick={() => handleFilter(category)}
              style={{
                backgroundColor: activeCategory === category ? "red" : "black",
                color: "white",
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-[95%] sm:w-[80%] mx-auto flex-wrap justify-center gap-2">
        {/* Car Listings */}
        <div className="flex w-[99%] sm:w-[80%] md:w-[95%] xl:w-[80%] mx-auto flex-wrap justify-center gap-6">
          {currentItems.map((car, index) => (
            <div
              className="w-[80%] md:w-[45%] lg:w-[30%] "
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={100}
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className=" flex justify-end mr-0 md:mr-28">
          {forFilteredInventory.length > itemsPerPage && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={Math.ceil(forFilteredInventory.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListings;
