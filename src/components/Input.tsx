import React from "react";

const Input = ({ active }) => {
  if (active) {
    return (
      <div className="opacity-75 bg-white w-screen h-screen flex flex-col items-center cursor-auto absolute top-0">
        <p>Input</p>
      </div>
    );
  }
  return <></>;
};

export default Input;
