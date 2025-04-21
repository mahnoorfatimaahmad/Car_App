import React, { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
const BookingSummary = ({ product, setDuration }) => {
  // console.log("product in summary", product);
  const [summaryData, setSummaryData] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    dropOffDate: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setSummaryData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (summaryData.pickUpDate && summaryData.dropOffDate) {
      const pickUpDate = new Date(summaryData.pickUpDate);
      const dropOffDate = new Date(summaryData.dropOffDate);

      if (pickUpDate < dropOffDate) {
        const diffInMs = dropOffDate - pickUpDate;

        // Convert the duration
        const totalHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const totalDays = Math.floor(totalHours / 24);
        const months = Math.floor(totalDays / 30);
        const days = totalDays % 30;
        const hours = totalHours % 24;
        const durationString = `${
          months > 0 ? `${months} months, ` : ""
        }${days} days, ${hours} hours`;

        setDuration(durationString);
      } else {
        setDuration("Invalid date range");
      }
    }
  }, [summaryData.pickUpDate, summaryData.dropOffDate]);
  return (
    <div className="bg-white shadow-md rounded-lg ">
      <h2 className="text-lg font-bold bg-black text-white py-2 px-4 rounded-t-lg">
        Booking Detail
      </h2>
      <div className="flex justify-between items-center font-semibold mb-4 p-4">
        <div className=" w-[45%]">
          <Select
            name="pickUpLocation"
            className=" w-full h-[35px]"
            value={summaryData.pickUpLocation}
            onChange={handleData}
          >
            {product?.location?.length > 0 ? (
              product.location.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No locations available</MenuItem>
            )}
          </Select>
          <InputLabel
            shrink
            className="text-white text-[16px] font-semibold custom-text-white"
          >
            Pick Up Date/Time
          </InputLabel>
          <TextField
            type="datetime-local"
            name="pickUpDate"
            value={summaryData.pickUpDate}
            onChange={handleData}
            variant="outlined"
            className="border-2 border-red-700 bg-white rounded-md"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className=" rounded-full font-medium bg-black text-white px-3 py-2 flex justify-center items-center  ">
          To
        </div>
        <div className="w-[45%]">
          <Select
            name="dropOffLocation"
            className=" w-full h-[35px] "
            value={summaryData.dropOffLocation}
            onChange={handleData}
          >
            {product?.location?.length > 0 ? (
              product.location.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No locations available</MenuItem>
            )}
          </Select>
          <InputLabel
            shrink
            className="text-white text-[16px] font-semibold custom-text-white"
          >
            Pick Up Date/Time
          </InputLabel>
          <div className="flex flex-col">
            <InputLabel
              shrink
              className="text-white text-[16px] font-semibold custom-text-white"
            >
              Drop Off Date/Time
            </InputLabel>
            <TextField
              type="datetime-local"
              name="dropOffDate"
              value={summaryData.dropOffDate}
              onChange={handleData}
              variant="outlined"
              className="border-2 border-red-700 bg-white rounded-md"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
