import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";

function RecipeCard({
  recipe,
  getRecipeDetails,
  addFavorite,
}) {
  return (
    <div className="card">

      <img
        src={recipe.image}
        alt={recipe.title}
      />

      <div className="cardContent">

        <h3>{recipe.title}</h3>

        <p>
          ✅ Used Ingredients :
          <strong> {recipe.usedIngredientCount}</strong>
        </p>

        <p>
          ❌ Missing Ingredients :
          <strong> {recipe.missedIngredientCount}</strong>
        </p>

        <div className="buttonGroup">

          <button
            onClick={() => getRecipeDetails(recipe.id)}
          >
            <FaEye />
            View
          </button>

          <button
            className="favBtn"
            onClick={() => addFavorite(recipe)}
          >
            <FaHeart />
            Favorite
          </button>

        </div>

      </div>

    </div>
  );
}

export default RecipeCard;