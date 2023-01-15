import React from "react";
import Buttons from "./Button/Buttons";

const Main = () => {
  return (
    <div className="flex flex-col">
      <div className="capitalize text-2xl flex mt-12 mx-12 mb-5 font-semibold text-gray-700">
        Company Settings
      </div>
      <Buttons />
    </div>
  );
};

export default Main;
