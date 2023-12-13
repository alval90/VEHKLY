import React, { useEffect, useState } from "react";
import { Container } from "../Container/Container";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../utils/hooks";
import { Spacer } from "../Spacer/Spacer";
import { Spacing } from "../Spacer/Spacing.ts";
import defaultImage from "../../assets/defaultImage.jpg";

import { getRecipe } from "../../api/RecipeApi.ts";
import { ContainerSize } from "../Container/ContainerSize.tsx";
import { Meal, Ingredient } from "../../utils/Meals.ts";

export const MealDetailView: React.FC = () => {
  const [meal, setMeal] = useState<Meal>();

  const navigate = useNavigate();
  const query = useQuery();
  const mealTitle = query.get("meal");
  useEffect(() => {
    if (mealTitle) {
      getRecipe(mealTitle)
        .then((res) => res.json())
        .then(setMeal);
    }
  }, [mealTitle]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <p
        onClick={handleClick}
        style={{
          paddingLeft: "20px",
          alignSelf: "baseline",
          color: "blue",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        ← back
      </p>
      {meal && <MealView meal={meal} />}
      <Spacer size={Spacing.m} />
    </Container>
  );
};

export interface MealViewProp {
  meal: Meal;
}
export const MealView: React.FC<MealViewProp> = ({ meal }) => {
  const ingredients = meal.ingredients.map((ingredient: Ingredient) => (
    <li>
      {ingredient.title}: {ingredient.amount}
    </li>
  ));

  return (
    <div
      style={{
        textAlign: "left",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        style={{ height: "140px", width: "140px", borderRadius: "12px" }}
        src={meal.imagePath ? meal.imagePath : defaultImage}
        alt={`Image of ${meal.title}`}
      />
      <Spacer size={Spacing.xs} />
      <h1>{meal.title}</h1>
      <Spacer size={Spacing.l} />
      <h2>Ingredients</h2>
      <ul>{ingredients}</ul>
      <Spacer size={Spacing.s} />
      {meal.description && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "pre-line",
          }}
        >
          <h2>Recipe</h2>
          <Spacer size={Spacing.xs} />
          <p style={{ fontSize: "14px", textAlign: "justify" }}>
            {meal.description}
          </p>
        </div>
      )}
    </div>
  );
};
