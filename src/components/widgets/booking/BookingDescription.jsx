import React from "react";

const BookingDescription = ({ description }) => {
  return (
    <div className="mt-6 border rounded-t-lg">
      <h2 className="text-lg font-bold bg-black text-white py-2 px-4 rounded-t-lg">
        Description of Listing
      </h2>
      <div className="mt-5 px-6 text-gray-600">{description} </div>
    </div>
  );
};

export default BookingDescription;
