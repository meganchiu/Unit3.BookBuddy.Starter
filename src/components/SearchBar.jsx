import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Search books by title..."
        value={query}
        onChange={handleChange}
        className="searchBar"
      />
    </div>
  );
}
