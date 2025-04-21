import React from "react";

const Button = ({ text }) => {
  return (
    <button className=" py-3 px-5 animate-border-move rounded-md bg-red-500 text-white">
      {text}
    </button>
  );
};

export default Button;
