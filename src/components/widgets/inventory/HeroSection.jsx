"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Hero from "@/components/miniWidgets/Hero";
import { useCarContext } from "@/contextApi/CarContext";

import AOS from "aos";
import "aos/dist/aos.css";
const HeroSection = () => {
  const searchResultsRef = useRef(null);
  const router = useRouter();
  const {
    inventory,
    forFilteredInventory,
    setforFilteredInventory,
    setInventory,
  } = useCarContext();

  const [searchFilter, setSearchFilter] = useState({
    pickupLocation: "",
    pickupDateTime: "",
    dropOffLocation: "",
    dropOffDateTime: "",
    adults: 1,
    kids: 0,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      offset: 100, // Offset from the top before animation starts
      delay: 0, // Delay in milliseconds
    });
  }, []);
  // Update `searchFilter` state when inputs change
  const handleSearchFilters = (e) => {
    const { name, value } = e.target;
    setSearchFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("serach filter in inventory page", searchFilter);

    // if (searchResultsRef.current) {
    //   searchResultsRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
  };

  // // Filter inventory based on search filters
  // Filter inventory based on search filters
  const filterInventory = () => {
    const filteredData = forFilteredInventory.filter((car) => {
      // Check if the pickup location matches
      const isPickupLocationMatch = searchFilter.pickupLocation
        ? car.location.includes(searchFilter.pickupLocation)
        : true;

      // Check if the drop-off location matches
      const isDropOffLocationMatch = searchFilter.dropOffLocation
        ? car.location.includes(searchFilter.dropOffLocation)
        : true;

      // Check for booking conflicts
      const isDateAvailable = (() => {
        if (searchFilter.pickupDateTime && searchFilter.dropOffDateTime) {
          const pickupDate = new Date(searchFilter.pickupDateTime);
          const dropOffDate = new Date(searchFilter.dropOffDateTime);

          // Ensure car.booking exists and is an array
          if (Array.isArray(car.booking) && car.booking.length > 0) {
            const hasConflict = car.booking.some((booking) => {
              const bookingStart = new Date(booking.startDate);
              const bookingEnd = new Date(booking.endDate);

              // Check for overlapping dates
              return (
                (pickupDate >= bookingStart && pickupDate <= bookingEnd) || // Pickup overlaps
                (dropOffDate >= bookingStart && dropOffDate <= bookingEnd) || // Drop-off overlaps
                (pickupDate <= bookingStart && dropOffDate >= bookingEnd) // Booking range fully covered
              );
            });

            return !hasConflict; // No conflicts, car is available
          }

          return true; // No bookings, car is available
        }

        return true; // No dates provided, car is available
      })();

      // // Filter by Kid-friendly and Adult-focused cars
      // const kidFriendlyCars = [];
      // const adultFocusedCars = [];
      // const bothTagsCars = [];

      // const kidandAdultFilter = () => {
      //   const kidCount = searchFilter.kids || 0; // Default to 0 if not provided
      //   const adultCount = searchFilter.adults || 1; // Default to 0 if not provided

      //   // Separate cars into categories
      //   if (
      //     car.tags.includes("Kid-friendly") &&
      //     car.tags.includes("Adult-focused")
      //   ) {
      //     bothTagsCars.push(car);
      //   } else if (car.tags.includes("Kid-friendly")) {
      //     kidFriendlyCars.push(car);
      //   } else if (car.tags.includes("Adult-focused")) {
      //     adultFocusedCars.push(car);
      //   }

      //   // Select cars
      //   const selectedKidCars = kidFriendlyCars.slice(0, kidCount);
      //   const selectedAdultCars = adultFocusedCars.slice(0, adultCount);

      //   // Fill remaining spots with cars that have both tags, if necessary
      //   while (selectedKidCars.length < kidCount && bothTagsCars.length > 0) {
      //     selectedKidCars.push(bothTagsCars.shift());
      //   }
      //   while (
      //     selectedAdultCars.length < adultCount &&
      //     bothTagsCars.length > 0
      //   ) {
      //     selectedAdultCars.push(bothTagsCars.shift());
      //   }
      //   console.log(
      //     "kids adult",
      //     ...new Set([...selectedKidCars, ...selectedAdultCars])
      //   );

      //   return [...new Set([...selectedKidCars, ...selectedAdultCars])];
      // };

      // // Filter cars by tags (if kidCount or adultCount filters are applied)
      // const filteredByTags = kidandAdultFilter();
      // console.log("filteredByTags", filteredByTags);

      // Check if the car matches location, availability, and tag filters
      return forFilteredInventory;
      // isPickupLocationMatch && isDropOffLocationMatch && isDateAvailable
      //    &&
      //   (filteredByTags.length > 0 ||
      //     !searchFilter.kidCount ||
      //     !searchFilter.adultCount)
      //
    });

    console.log("Filtered Data:", filteredData);

    // Update filtered inventory
    setInventory(filteredData);
    router.push("/inventory");
  };

  return (
    <div className="relative h-[50vh] bg-cover bg-center ">
      <Hero />

      {/* Content */}
      <div
        // data-aos="zoom-in-down"
        className=" w-[80%] xl:w-[50%] mx-auto absolute left-[10%] sm:left-[10%] xl:left-[25%] -bottom-28 md:-bottom-20 flex flex-col items-center
        justify-center h-full text-white space-y-8"
      >
        {/* Subscription Tabs */}

        {/* Search Form */}
        <form
          className="bg-white rounded-md shadow-lg p-6 w-4/5 md:w-2/3"
          onSubmit={(e) => {
            e.preventDefault();
            filterInventory();
          }}
        >
          <h2 className="text-xl font-bold text-black mb-4">Search for Cars</h2>
          <div className="grid  grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Pickup Location */}
            <TextField
              label="Pick Up Location"
              name="pickupLocation"
              value={searchFilter.pickupLocation}
              onChange={handleSearchFilters}
              variant="outlined"
              fullWidth
              size="small"
            />

            {/* Drop-Off Location */}
            <TextField
              label="Drop Off Location"
              name="dropOffLocation"
              value={searchFilter.dropOffLocation}
              onChange={handleSearchFilters}
              variant="outlined"
              fullWidth
              size="small"
            />

            {/* Pickup Date */}
            <TextField
              label="Pick Up Date/Time"
              name="pickupDateTime"
              value={searchFilter.pickupDateTime}
              onChange={handleSearchFilters}
              type="datetime-local"
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Drop-Off Date */}
            <TextField
              label="Drop Off Date/Time"
              name="dropOffDateTime"
              value={searchFilter.dropOffDateTime}
              onChange={handleSearchFilters}
              type="datetime-local"
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Adults */}
            <FormControl fullWidth size="small">
              <InputLabel>Adults</InputLabel>
              <Select
                name="adults"
                value={searchFilter.adults}
                onChange={handleSearchFilters}
                label="Adults"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem value={num} key={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Kids */}
            <FormControl fullWidth size="small">
              <InputLabel>Kids</InputLabel>
              <Select
                name="kids"
                value={searchFilter.kids}
                onChange={handleSearchFilters}
                label="Kids"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <MenuItem value={num} key={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#FF0000",
                color: "#FFF",
                width: "50%",
              }}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
