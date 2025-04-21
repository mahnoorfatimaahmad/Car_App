import React from "react";
import { TextField, Checkbox, Button } from "@mui/material";

const BookingForm = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold bg-black text-white py-2 px-4 rounded-t-lg">
        Booking Summary
      </h2>
      <div className="space-y-2 m-4 pb-3 border-b">
        <div className="flex justify-between">
          <span>Rental Charges</span>
          <span>{product.kmPerDay}</span>
        </div>
        <div className="flex justify-between">
          <span>GST</span>
          <span>$100</span>
        </div>
        <div className="flex justify-between">
          <span>Refundable Deposit</span>
          <span>₹3,000</span>
        </div>
      </div>
      <div className="mt-2 flex flex-col justify-center">
        <div>
          <Checkbox color="primary" />
          <span className="text-sm ">
            Luggage carrier (Subject to availability)
          </span>
        </div>
        <div>
          <Checkbox color="primary" />
          <span className="text-sm ">With Deriver </span>
        </div>
      </div>

      <div className="mt-6 flex justify-between text-lg font-semibold">
        <span>Total Amount</span>
        <span>₹14,296</span>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="bg-black mt-6 text-white"
        fullWidth
      >
        Proceed
      </Button>
    </div>
  );
};

export default BookingForm;
