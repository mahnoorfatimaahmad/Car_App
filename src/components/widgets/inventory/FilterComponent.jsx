"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCarContext } from "@/contextApi/CarContext";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { Checkbox, Collapse, FormControlLabel, Dialog } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoClose } from "react-icons/io5";

import { Language } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
const SidebarFilter = () => {
  const { setInventory, inventory, forFilteredInventory } = useCarContext();
  const [expandedSections, setExpandedSections] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState({});
  const [filterData, setFilteredData] = useState({});
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);
  // Toggle the expansion of filter sections
  const toggleSection = (section) => {
    console.log("clickable", section);

    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  const isSectionExpanded = (section) => expandedSections.includes(section);

  // Update checkedOptions state when a checkbox is toggled
  const handleCheckboxChange = (label, category) => {
    console.log("label", label, "category", category);

    setCheckedOptions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [label]: !prev[category]?.[label],
      },
    }));
  };

  // Filter inventory dynamically when checkedOptions changes
  useEffect(() => {
    const filteredInventory = forFilteredInventory.filter((car) =>
      Object.entries(checkedOptions).every(([category, options]) => {
        const activeFilters = Object.keys(options).filter(
          (key) => options[key]
        );

        // Skip filtering for categories with no active filters
        if (activeFilters.length === 0) return true;

        // Ensure the car matches at least one active filter in this category
        return activeFilters.includes(car[category]);
      })
    );

    setInventory(filteredInventory); // Update the inventory with filtered results
  }, [checkedOptions, forFilteredInventory, setInventory]);

  useLayoutEffect(() => {
    const uniqueSegments = Array.from(
      new Set(forFilteredInventory.map((item) => item.segment))
    );
    const uniqueCarModels = Array.from(
      new Set(forFilteredInventory.map((item) => item.brand))
    );
    const uniqueFuelTypes = Array.from(
      new Set(forFilteredInventory.map((item) => item.fuel))
    );
    const uniqueTransmissions = Array.from(
      new Set(forFilteredInventory.map((item) => item.transmission))
    );
    const uniqueLuggageOptions = Array.from(
      new Set(forFilteredInventory.map((item) => item.luggage))
    );
    // const uniqueSeatingOptions = Array.from(
    //   new Set(forFilteredInventory.map((item) => item.seatingCapacity))
    // );

    setFilteredData({
      segment: uniqueSegments,
      brand: uniqueCarModels,
      fuel: uniqueFuelTypes,
      transmission: uniqueTransmissions,
      luggage: uniqueLuggageOptions,
      // seatingCapacity: uniqueSeatingOptions,
    });
  }, [inventory]);

  console.log("filetredata", filterData);

  return (
    <>
      {/* Filter Button for small screens */}
      <button
        className="md:hidden w-[50%] mx-auto bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>
      {/* Modal for small screens */}
      <div
        className={`bg-black/70 md:hidden fixed z-50 ${
          open ? "top-0" : "-top-full"
        }  w-full left-0 h-full overflow-scroll flex justify-center p-4  transition-all duration-300 ease-in-out`}
      >
        <div
          className={`bg-white  z-50 w-[60%]  h-auto overflow-scroll  p-4 mt-10   transition-all duration-300 ease-in-out`}
          aos-data="fade-up"
          aos-delay="200"
        >
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
            onClick={toggleModal}
          >
            <IoClose />
          </button>

          {/* Filters */}
          {Object.keys(filterData).map((category) => (
            <div className="mb-4" key={category}>
              {/* Section Header */}
              <div
                className="flex justify-between items-center cursor-pointer p-2"
                onClick={() => toggleSection(category)}
              >
                <h3 className="font-semibold text-sm capitalize">{category}</h3>
                {isSectionExpanded(category) ? (
                  <ExpandLessIcon className="text-gray-600" />
                ) : (
                  <ExpandMoreIcon className="text-gray-600" />
                )}
              </div>

              {/* Collapsible Options */}
              <Collapse
                in={isSectionExpanded(category)}
                timeout="auto"
                unmountOnExit
              >
                <div className="mt-2 space-y-1">
                  {filterData[category]?.map((option, index) => (
                    <div className="flex items-center" key={index}>
                      <div className="flex items-center gap-2 text-gray-600">
                        <input
                          type="checkbox"
                          id={option}
                          checked={checkedOptions[category]?.[option] || false}
                          onChange={() =>
                            handleCheckboxChange(option, category)
                          }
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                      {/* <span className="text-gray-500 text-xs">4</span> */}
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}

          {/* Apply Filter Button */}
          <button
            className="bg-red-500 active:bg-red-600  hover:bg-red-600 transition-all ease-in-out duration-200 text-white px-4 py-2 rounded w-full mt-4"
            onClick={toggleModal}
          >
            Apply Filter
          </button>
        </div>
      </div>
      <div className="w-64 hidden md:flex flex-col p-4 border-r">
        {Object.keys(filterData).map((category) => (
          <div className="mb-4  p-1" key={category}>
            {/* Section Header */}
            <div
              className="flex justify-between items-center  cursor-pointer"
              onClick={() => toggleSection(category)}
            >
              <h3 className="font-semibold text-sm capitalize">{category}</h3>
              {isSectionExpanded(category) ? (
                <ExpandLessIcon className="text-gray-600" />
              ) : (
                <ExpandMoreIcon className="text-gray-600" />
              )}
            </div>

            {/* Collapsible Options */}
            <Collapse
              in={isSectionExpanded(category)}
              timeout="auto"
              unmountOnExit
            >
              <div className="mt-2 space-y-1 px-1">
                {filterData[category]?.map((option, index) => (
                  <div className="flex items-center  " key={index}>
                    <div className="flex items-center gap-2 text-gray-600">
                      <input
                        type="checkbox"
                        id={option}
                        checked={checkedOptions[category]?.[option] || false}
                        onChange={() => handleCheckboxChange(option, category)}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>

                    <label className="text-sm flex-grow"></label>
                    {/* <span className="text-gray-500 text-xs">4</span> */}
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </>
  );
};

export default SidebarFilter;

export function SortComponent({ setIsGrid, isGrid }) {
  const { setInventory, inventory, forFilteredInventory } = useCarContext();

  const [sortOption, setSortOption] = useState("Recommended");
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("sort change", sortOption);
  useEffect(() => {
    if (sortOption === "Price: Low to High") {
      setInventory((prevInventory) =>
        [...prevInventory].sort((a, b) => a.pricePerDay - b.pricePerDay)
      );
    } else if (sortOption === "Price: High to Low") {
      setInventory((prevInventory) =>
        [...prevInventory].sort((a, b) => b.pricePerDay - a.pricePerDay)
      );
    }
  }, [sortOption]);
  const handleSortChange = (event) => setSortOption(event.target.value);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    console.log("search query", query);

    const filteredCars = forFilteredInventory.filter(
      (car) =>
        // car.model.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query)
    );

    setInventory(filteredCars);
  };
  return (
    <>
      {/* Search and Sort Section */}
      <div className="flex flex-col gap-3 md:flex-row items-center justify-between mb-8">
        <input
          type="text"
          placeholder="Search cars..."
          onChange={handleSearchChange}
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none"
        />
        <div className="flex items-center justify-center">
          <div className="   text-amber-800 flex  items-center justify-center ">
            <button
              className={`${
                isGrid === "list"
                  ? "bg-red-600 text-white "
                  : "bg-white text-amber-800"
              } text-3xl p-1 bg-red-600 rounded-l-md`}
              onClick={() => setIsGrid("list")}
            >
              <ViewListIcon />
            </button>
            <button
              className={`${
                isGrid === "grid"
                  ? "bg-red-600 text-white "
                  : "bg-white text-amber-800"
              } text-3xl p-1 bg-red-600 rounded-r-md`}
              onClick={() => setIsGrid("grid")}
            >
              <GridViewIcon />
            </button>
          </div>
          <FormControl className="ml-4  min-w-[150px]">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              className="bg-white mt-2 "
            >
              {" "}
              <MenuItem value="Recommended">Recommended</MenuItem>
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export const FilterComponent = ({
  filter,
  count,
  handleCheckboxChange,
  checkedOptions,
}) => {
  return (
    <div className="flex items-center  ">
      <div className="flex items-center gap-2 text-gray-600">
        <input
          type="checkbox"
          id={filter}
          checked={!!checkedOptions[filter]}
          onChange={() => handleCheckboxChange(filter)}
        />
        <label htmlFor={filter}>{filter}</label>
      </div>

      <label className="text-sm flex-grow"></label>
      <span className="text-gray-500 text-xs">({count})</span>
    </div>
  );
};
