import React from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

function SearchBar({
  ingredient,
  setIngredient,
  searchRecipes,
  clearSearch,
}) {
  return (
    <div className="searchBar">

      <input
        type="text"
        placeholder="Enter ingredients (egg,tomato,onion)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchRecipes();
          }
        }}
      />

      <button onClick={() => searchRecipes()}>
  <FaSearch />
  Search
</button>

      <button
  className="clearBtn"
  onClick={() => clearSearch()}
>
  <FaTrash />
  Clear
</button>

    </div>
  );
}

export default SearchBar;