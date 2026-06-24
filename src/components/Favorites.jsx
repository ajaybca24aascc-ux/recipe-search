import React from "react";
import { FaTrash } from "react-icons/fa";

function Favorites({ favorites, removeFavorite }) {

  if (favorites.length === 0) {
    return (
      <div className="favoriteSection">

        <h2>❤️ My Favorite Recipes</h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          No favorite recipes added yet.
        </p>

      </div>
    );
  }

  return (
    <div className="favoriteSection">

      <h2>❤️ My Favorite Recipes</h2>

      <p
        style={{
          textAlign: "center",
          color: "#555",
          fontWeight: "bold",
          marginBottom: "25px",
          fontSize: "18px",
        }}
      >
        Total Favorites: {favorites.length}
      </p>

      <div className="recipeGrid">

        {favorites.map((recipe) => (

          <div
            className="card"
            key={recipe.id}
          >

            <img
              src={recipe.image}
              alt={recipe.title}
            />

            <div className="cardContent">

              <h3>{recipe.title}</h3>

              <button
                className="removeBtn"
                onClick={() => removeFavorite(recipe.id)}
              >
                <FaTrash />
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Favorites;