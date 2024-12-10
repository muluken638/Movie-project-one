// context/SearchContext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const performSearch = (term) => {
    setSearchTerm(term);

    if (term.toLowerCase().includes("movie")) {
      navigate("/userlayout/movies");
    } else if (term.toLowerCase().includes("series")) {
      navigate("/userlayout/series");
    } else if (term.toLowerCase().includes("contact")) {
      navigate("/userlayout/contact");
    } else {
      navigate("/userlayout/homepage"); // Default search route
    }
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, performSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
