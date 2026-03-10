import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-2xl w-full md:h-14 h-12 flex items-center bg-white/90 backdrop-blur-md border border-red-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
    >
      <img
        src={assets.search_icon}
        alt="search-icon"
        className="w-5 ml-4 opacity-70"
      />

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search courses, skills, or topics..."
        className="flex-1 h-full px-4 outline-none text-gray-600 bg-transparent"
      />

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white md:px-8 px-6 py-2 mr-2 rounded-full text-sm font-medium transition"
      >
        Search
      </button>
    </form>
  );
};
