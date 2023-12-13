import React, { useEffect, useState } from "react";
import { Container, ContainerSize } from "../Container/Container";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../utils/hooks";
import { Ingredient, Meal } from "../AddMeal/AddMeal";
import { Spacer, Spacing } from "../Spacer/Spacer";
import defaultImage from "../../images/defaultImage.jpg";

import { getRecipe } from "../../api/RecipeApi.ts";

export const MealDetailView = () => {
  const [meal, setMeal] = useState<Meal>();

  const navigate = useNavigate();
  const query = useQuery();
  useEffect(() => {
    const mealTitle = query.get("meal");
    if (mealTitle) {
      getRecipe(mealTitle)
        .then((res) => res.json())
        .then(setMeal);
    }
  }, []);

  const handleClick = (e: any) => {
    navigate(-1);
  };

  return (
    <Container size={ContainerSize.Small}>
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
  let ingredients = meal.ingredients.map((ingredient: Ingredient) => (
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
