import React from "react";

function RecipeDetails({ selectedRecipe }) {

  if (!selectedRecipe) return null;

  return (

    <div className="details">

      <h2>{selectedRecipe.title}</h2>

      <img
        src={selectedRecipe.image}
        alt={selectedRecipe.title}
        className="detailImage"
      />

      <div className="recipeInfo">

        <p>
          <strong>⏱ Ready In:</strong>{" "}
          {selectedRecipe.readyInMinutes} mins
        </p>

        <p>
          <strong>🍽 Servings:</strong>{" "}
          {selectedRecipe.servings}
        </p>

      </div>

      <h3>Recipe Summary</h3>

      <div
        className="summary"
        dangerouslySetInnerHTML={{
          __html: selectedRecipe.summary,
        }}
      />

      <h3>Ingredients</h3>

      <ul>

        {selectedRecipe.extendedIngredients.map((item) => (

          <li key={item.id}>

            {item.original}

          </li>

        ))}

      </ul>

      <h3>Cooking Instructions</h3>

      {selectedRecipe.analyzedInstructions &&
      selectedRecipe.analyzedInstructions.length > 0 ? (

        <ol>

          {selectedRecipe.analyzedInstructions[0].steps.map((step) => (

            <li key={step.number}>

              {step.step}

            </li>

          ))}

        </ol>

      ) : selectedRecipe.instructions ? (

        <div
          dangerouslySetInnerHTML={{
            __html: selectedRecipe.instructions,
          }}
        />

      ) : (

        <p>

          ⚠️ Cooking instructions are not available for this recipe.

        </p>

      )}

    </div>

  );
}

export default RecipeDetails;