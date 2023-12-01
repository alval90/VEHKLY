import React, { useEffect, useState } from "react";
import { Container, ContainerSize } from "../Container/Container";
import {HttpStatusCode, useAuth} from "../../contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spacer, Spacing } from "../Spacer/Spacer";
import { ActionCard } from "../ActionCard/ActionCard";
import { MediaCard } from "../MediaCard/MediaCard";
import { TextField } from "@mui/material";
import { useQuery } from "../../utils/hooks";
import { BackButton } from "../BackButton/BackButton";

import mockMeals from "./MockData/meals.json";
import {deleteRecipe, getRecipes} from "../../api/RecipeApi.ts";
import {getCurrentWeekMealPlanURL} from "../../utils/dateUtils.ts";
import {putMealPlan} from "../../api/MealPlan.ts";

export interface Meal {
  title: string;
  description: string | null;
  imagePath: string | null;
  ingredients: Ingredient[];
}

export interface Ingredient {
  title: string;
  amount: string;
}

export const AddMeal: React.FC<{}> = () => {
  let [meals, setMeals] = useState<Meal[]>();
  const [searchInput, setSearchInput] = useState("");

  const { year, week } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  useEffect(() => {
    getRecipes()
      .then(res => res.json())
      .then(setMeals);
  },[]);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const addMeal = (mealTitle: string) => {
    const day = query.get("day");
    const type = query.get("type");
    console.log(`${year}, ${week}, ${day}, ${type}`);
    if (year && week && day && type) {
      putMealPlan(year, week, day, type, mealTitle)
        .then(res => res.json())
        .then(data => {
          navigate(-1);
        })
    }
  };

  const deleteMeal = async (mealTitle: string) => {
    await deleteRecipe(mealTitle)
      .then((res) => {
          if (res.status == HttpStatusCode.OK) {
            const updatedMeals = meals?.filter((meal) => meal.title !== mealTitle);
            setMeals(updatedMeals);
          } else {
            throw Error("Unable to delte recipe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const mealCards = meals
    ?.filter((meal) =>
      meal.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    .map((meal) => (
      <MediaCard
        imagePath={meal.imagePath}
        imageTitle={meal.title}
        actionLabel={"Add"}
        clickEvent={() => addMeal(meal.title)}
        deleteClickEvent={() => deleteMeal(meal.title)}
      />
    ));

  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <BackButton />
      <h1>Meals</h1>
      <Spacer size={Spacing.s} />
      <div>
        <TextField
          id="outlined-basic"
          label="Search"
          onChange={handleSearchChange}
          value={searchInput}
          variant="filled"
          style={{ width: "300px" }}
        />
      </div>
      <Spacer size={Spacing.m} />
      <div
        style={{
          display: "grid",
          gridGap: "30px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          marginLeft: "38px",
        }}
      >
        <ActionCard label={"+ New meal"} href={"/newmeal"} />
        {mealCards}
      </div>
      <Spacer size={Spacing.m} />
    </Container>
  );
};
