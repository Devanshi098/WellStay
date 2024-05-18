import React from "react";

const Filter = ({ icon, title }) => {
  return (
    <div className="flex items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px]">
      {icon}
      {title}
    </div>
  );
};

export default Filter;
