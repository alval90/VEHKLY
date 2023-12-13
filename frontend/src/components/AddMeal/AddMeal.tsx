import React, { ChangeEvent, useEffect, useState } from "react";
import { Container } from "../Container/Container";
import { useNavigate, useParams } from "react-router-dom";
import { Spacer } from "../Spacer/Spacer";
import { Spacing } from "../Spacer/Spacing.ts";
import { ActionCard } from "../ActionCard/ActionCard";
import { MediaCard } from "../MediaCard/MediaCard";
import { TextField } from "@mui/material";
import { useQuery } from "../../utils/hooks";
import { BackButton } from "../BackButton/BackButton";
import { deleteRecipe, getRecipes } from "../../api/RecipeApi.ts";
import { putMealPlan } from "../../api/MealPlan.ts";
import { HttpStatusCode } from "../../api/HttpStatusCodes.ts";
import { ContainerSize } from "../Container/ContainerSize.tsx";
import { Meal } from "../../utils/Meals.ts";

export const AddMeal: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>();
  const [searchInput, setSearchInput] = useState("");

  const { year, week } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  useEffect(() => {
    getRecipes()
      .then((res) => res.json())
      .then(setMeals);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const addMeal = (mealTitle: string) => {
    const day = query.get("day");
    const type = query.get("type");
    if (year && week && day && type) {
      putMealPlan(year, week, day, type, mealTitle)
        .then((res) => res.json())
        .then(() => {
          navigate(-1);
        });
    }
  };

  const deleteMeal = async (mealTitle: string) => {
    await deleteRecipe(mealTitle)
      .then((res) => {
        if (res.status == HttpStatusCode.OK) {
          const updatedMeals = meals?.filter(
            (meal) => meal.title !== mealTitle,
          );
          setMeals(updatedMeals);
        } else {
          throw Error("Unable to delete recipe");
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
