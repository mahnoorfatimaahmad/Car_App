import React from "react";

const AnimatedButton = ({ text }) => {
  return (
    <button
      className="mt-4 p-[6px] rounded-lg "
      style={{
        position: "relative",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#333",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "2px solid transparent",
          backgroundImage: "linear-gradient(90deg, red,red  )",
          backgroundSize: "400% 400%",
          animation: "move-border 3s linear infinite",
          boxSizing: "border-box",
          pointerEvents: "none",
          zIndex: 1,
        }}
      ></span>
      <span
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className=" py-3 px-3  rounded-md animate-border-move bg-red-500 text-white">
          {text}
        </div>
      </span>

      <style>
        {`
          @keyframes move-border {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }
        `}
      </style>
    </button>
  );
};

export default AnimatedButton;
