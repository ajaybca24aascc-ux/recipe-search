import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import SearchBar from "./components/SearchBox";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";

function App() {

  const API_KEY = import.meta.env.VITE_SPOON_API_KEY;

  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("history");
  return saved ? JSON.parse(saved) : [];
});
 const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

useEffect(() => {
  localStorage.setItem("history", JSON.stringify(history));
}, [history]);
  // ---------------- SEARCH RECIPES ----------------

 const searchRecipes = async (searchItem = ingredient) => {

    if (searchItem.trim() === "") {
      alert("Please enter ingredient(s).");
      return;
    }

    setLoading(true);
    setSearched(true);
    setSelectedRecipe(null);
 setHistory((prev) => {
  const updated = [
    searchItem,
    ...prev.filter((item) => item !== searchItem),
  ];
  return updated.slice(0, 5);
});

const ingredientMap = {
  mutton: "lamb",
  brinjal: "eggplant",
  capsicum: "bell pepper",
  "lady finger": "okra",
  coriander: "cilantro",
  curd: "yogurt",
  maida: "all-purpose flour",
  "corn flour": "cornstarch",

  beetroot: "beet",
  "spring onion": "scallion",
  "green chilli": "green chili",
};

const searchIngredient =
  ingredientMap[searchItem.trim().toLowerCase()] || searchItem.trim();
    try {
    
    

      const response = await axios.get(
  "https://api.spoonacular.com/recipes/findByIngredients",
  {
    params: {
     ingredients: searchIngredient,
      number: 12,
      ranking: 1,
      apiKey: API_KEY,
    },
  }
);


      setRecipes(response.data);
      setIngredient(searchItem);
      window.scrollTo({
  top: 0,
  behavior: "smooth",
});

    } catch (error) {

  console.log(error);

  if (error.response?.status === 402) {
    alert("⚠️ Spoonacular API daily limit reached. Please try again tomorrow.");
  }

  else if (error.response?.status === 401) {
    alert("❌ Invalid API Key.");
  }

  else if (!navigator.onLine) {
    alert("🌐 No Internet Connection.");
  }

  else {
    alert("❌ Something went wrong. Please try again.");
  }

}

setLoading(false);

  };

  // ---------------- CLEAR ----------------

 const clearSearch = () => {

  setIngredient("");
  setRecipes([]);
  setSelectedRecipe(null);
  setSearched(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

};

  // ---------------- DETAILS ----------------

  const getRecipeDetails = async (id) => {

    setLoading(true);

    try {

      const response = await axios.get(

        `https://api.spoonacular.com/recipes/${id}/information`,

        {
          params: {
            apiKey: API_KEY,
          },
        }

      );

      setSelectedRecipe(response.data);

      window.scrollTo({

        top: document.body.scrollHeight,
        behavior: "smooth",

      });

    }

    catch (error) {

      console.log(error);

      alert("Unable to fetch recipe details.");

    }

    setLoading(false);

  };

  // ---------------- FAVORITES ----------------

  const addFavorite = (recipe) => {

    const exists = favorites.find((item) => item.id === recipe.id);

    if (exists) {

      alert("Already added to favorites.");

      return;

    }

    setFavorites([...favorites, recipe]);

  };

  const removeFavorite = (id) => {

    setFavorites(

      favorites.filter((recipe) => recipe.id !== id)

    );

  };

  return (

    <div className="container">

     <div className="hero">

  <h1>🍽 Recipe Search App</h1>

  <p>
    Discover delicious recipes using ingredients already available in your kitchen.
  </p>

</div>

<SearchBar
  ingredient={ingredient}
  setIngredient={setIngredient}
  searchRecipes={searchRecipes}
  clearSearch={clearSearch}
/>

<div className="stats">

  <div className="statBox">
    <h2>{recipes.length}</h2>
    <p>Recipes Found</p>
  </div>

  <div className="statBox">
    <h2>{favorites.length}</h2>
    <p>Favorites</p>
  </div>

  <div className="statBox">
  <h2>{ingredient === "" ? 0 : 1}</h2>
  <p>Current Search</p>
</div>



</div>
{history.length > 0 && (
  <div className="history">
    <h3>🕒 Recent Searches</h3>
    <div className="historyList">
      {history.map((item, index) => (
        <button
          key={index}
      onClick={() => {
  setIngredient(item);
  searchRecipes(item);
}}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
)}
     {loading && (
  <div className="loader">
    <div className="spinner"></div>
  </div>
)}
      {!loading && searched && recipes.length === 0 && (

        <h2 className="notFound">

          No Recipes Found

        </h2>

      )}

      {recipes.length > 0 && (

       <h2
  style={{
    textAlign: "center",
    color: "#ff5722",
    marginTop: "20px",
  }}
>
  🍽 Found {recipes.length} Recipes
</h2>

      )}

      <div className="recipeGrid">

        {recipes.map((recipe) => (

          <RecipeCard

            key={recipe.id}

            recipe={recipe}

            getRecipeDetails={getRecipeDetails}

            addFavorite={addFavorite}

          />

        ))}


      </div>
            <Favorites
        favorites={favorites}
        removeFavorite={removeFavorite}
      />

      <RecipeDetails
        selectedRecipe={selectedRecipe}
      />

      <div className="about">

<h2>About This Project</h2>

<p>
This Recipe Search App is built using React, Axios, Spoonacular API and CSS.
Users can search recipes by ingredients, view complete cooking instructions,
save favorite recipes and explore recipe details in a simple interface.
</p>

</div>

      <footer className="footer">
  <h3>🍽 Recipe Search App</h3>

  <p>
    Built with React, Axios & Spoonacular API
  </p>

  <p>
    Developed by <strong>Ajay Kumar</strong>
  </p>

  <p>© 2026 All Rights Reserved</p>
</footer>
    </div>

  );
}

export default App;