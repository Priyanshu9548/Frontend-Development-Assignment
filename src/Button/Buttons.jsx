import React from "react";
import { Link } from "react-router-dom";
import { Sections } from "../Content";

const Buttons = () => {
  return (
    <div className="flex mx-12 border-2 w-fit divide-x-2 rounded-lg">
      {Sections.map((title, i) => {
        return (
          <Link
            key={i}
            to={`/${title.id}`}
            className="px-4 py-2 text-sm font-semibold rounded dark:bg-gray-400  dark:text-gray-800"
          >
            {title.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Buttons;
