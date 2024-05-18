import React from "react";
import { GiFishingBoat, GiMineExplosion } from "react-icons/gi";
import { ImKey } from "react-icons/im";
import { RiAliensFill } from "react-icons/ri";
import { BsFillTreeFill } from "react-icons/bs";

const Filter = ({ icon, title }) => {
  return (
    <div className="flex items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px]">
      {icon}
      {title}
    </div>
  );
};

const Filters = () => {
  const sorting = [
    { title: "Boat", icon: <GiFishingBoat /> },
    { title: "New", icon: <GiMineExplosion /> },
    { title: "Unique", icon: <RiAliensFill /> },
    { title: "Private", icon: <ImKey /> },
    { title: "Forest", icon: <BsFillTreeFill /> },
  ];
  return (
    <div className="flex justify-start gap-3 sm:gap-4 mt-4">
      {sorting.map((obj, index) => (
        <Filter key={index} title={obj.title} icon={obj.icon} />
      ))}
    </div>
  );
};

export default Filters;
