"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";
import { useCarContext } from "@/contextApi/CarContext";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
const HomeFilter = () => {
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

  // Update `searchFilter` state when inputs change
  const handleSearchFilters = (e) => {
    const { name, value } = e.target;
    setSearchFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

            return !hasConflict;
          }

          return true;
        }

        return true;
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
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      offset: 100, // Offset from the top before animation starts
      delay: 0, // Delay in milliseconds
    });
  }, []);
  return (
    <div className=" bg-red-700 bg-opacity-90 rounded-md p-6 shadow-lg w-80  sm:w-96">
      <h2 className="text-xl font-bold text-white mb-4">
        Search for Rental Cars
      </h2>
      <div className="grid gap-1">
        {/* Categories Checkbox */}
        <div className="flex justify-around text-[10px] border-red-600">
          {["Sudan", "SUV", "Luxury", "Hatchback", "Off Road"].map(
            (label, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center bg-white p-1 px-2 rounded-md border-red-600 border-2"
              >
                <DirectionsCar />
                {label}
              </div>
            )
          )}
        </div>

        {/* Pickup Location */}
        <div className="flex flex-col text-white">
          <InputLabel
            shrink
            className="text-white text-[16px] font-semibold custom-text-white"
          >
            Pick Up Location
          </InputLabel>
          <TextField
            name="pickupLocation"
            value={searchFilter.pickupLocation}
            onChange={handleSearchFilters}
            variant="outlined"
            className="border-2 border-red-700 bg-white rounded-md"
            fullWidth
            size="small"
          />
        </div>

        {/* Pickup Date/Time */}
        <div className="flex flex-col">
          <InputLabel
            shrink
            className="text-white text-[16px] font-semibold custom-text-white"
          >
            Pick Up Date/Time
          </InputLabel>
          <TextField
            type="datetime-local"
            name="pickupDateTime"
            value={searchFilter.pickupDateTime}
            onChange={handleSearchFilters}
            variant="outlined"
            className="border-2 border-red-700 bg-white rounded-md"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        {/* Drop Off Location */}
        <div className="flex flex-col">
          <InputLabel
            shrink
            className="text-white text-[16px] font-semibold custom-text-white"
          >
            Drop Off Location
          </InputLabel>
          <TextField
            name="dropOffLocation"
            value={searchFilter.dropOffLocation}
            onChange={handleSearchFilters}
            variant="outlined"
            className="border-2 border-red-700 bg-white rounded-md"
            fullWidth
            size="small"
          />
        </div>

        {/* Drop Off Date/Time */}
        <div className="flex flex-col">
          <InputLabel
            shrink
            className="text-white text-[16px] font-semibold custom-text-white"
          >
            Drop Off Date/Time
          </InputLabel>
          <TextField
            type="datetime-local"
            name="dropOffDateTime"
            value={searchFilter.dropOffDateTime}
            onChange={handleSearchFilters}
            variant="outlined"
            className="border-2 border-red-700 bg-white rounded-md"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        {/* Adults and Kids */}
        <div className="flex space-x-4  items-center justify-center mb-2">
          <FormControl fullWidth size="small" className="mt-4 text-white">
            <InputLabel className="text-white  focus:text-white">
              Adults
            </InputLabel>
            <Select
              name="adults"
              value={searchFilter.adults}
              onChange={handleSearchFilters}
              className=" border-red-700 mt-2 bg-white rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem value={num} key={num} className="bg-red-700">
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" className="mt-4 text-white">
            <InputLabel className="text-white focus:text-white ">
              Kids
            </InputLabel>
            <Select
              name="kids"
              value={searchFilter.kids}
              onChange={handleSearchFilters}
              className=" border-red-700 focus:border-none focus:text-white bg-white rounded-md mt-1"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <MenuItem value={num} key={num} className="bg-red-700">
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Search Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={filterInventory}
          style={{ backgroundColor: "#FF0000", color: "#FFF" }}
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
};

export default HomeFilter;
