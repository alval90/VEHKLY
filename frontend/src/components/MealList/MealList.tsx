import React, { useEffect, useState } from "react";
import { Container } from "../Container/Container";
import { useQuery } from "../../utils/hooks";
import { Spacer } from "../Spacer/Spacer";
import { Spacing } from "../Spacer/Spacing.ts";
import { MealView } from "../MealDetailView/MealDetailView";
import { BackButton } from "../BackButton/BackButton";

import { getMealPlan } from "../../api/MealPlan.ts";
import { ContainerSize } from "../Container/ContainerSize.tsx";
import { Meal, MealPlanInterface } from "../../utils/Meals.ts";

export const MealList: React.FC = () => {
  const [mondayMeals, setMondayMeals] = useState<Meal[]>();
  const [tuesdayMeals, setTuesdayMeals] = useState<Meal[]>();
  const [wednesdayMeals, setWednesdayMeals] = useState<Meal[]>();
  const [thursdayMeals, setThursdayMeals] = useState<Meal[]>();
  const [fridayMeals, setFridayMeals] = useState<Meal[]>();

  const query = useQuery();
  const year = query.get("year");
  const week = query.get("week");
  useEffect(() => {
    if (year && week) {
      getMealPlan(year, week)
        .then((res) => res.json())
        .then(initMealList);
    }
    window.scrollTo(0, 0);
  }, [year, week]);

  const initMealList = (meals: MealPlanInterface[]) => {
    for (const meal of meals) {
      const { breakfast, lunch, dinner } = meal;
      if (!breakfast && !lunch && !dinner) {
        continue;
      }
      const mealsUpdated: Meal[] = [breakfast, lunch, dinner].flatMap((meal) =>
        meal ? [meal] : [],
      );
      switch (meal.day.toLowerCase()) {
        case "monday":
          setMondayMeals(mealsUpdated);
          break;
        case "tuesday":
          setTuesdayMeals(mealsUpdated);
          break;
        case "wednesday":
          setWednesdayMeals(mealsUpdated);
          break;
        case "thursday":
          setThursdayMeals(mealsUpdated);
          break;
        case "friday":
          setFridayMeals(mealsUpdated);
          break;
      }
    }
  };

  const mondayList = mondayMeals
    ?.filter((meal) => meal !== null)
    .map((meal) => <MealView meal={meal} />);
  const tuesdayList = tuesdayMeals?.map((meal) => <MealView meal={meal} />);
  const wednesdayList = wednesdayMeals?.map((meal) => <MealView meal={meal} />);
  const thursdayList = thursdayMeals?.map((meal) => <MealView meal={meal} />);
  const fridayList = fridayMeals?.map((meal) => <MealView meal={meal} />);

  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <BackButton />
      {mondayList && (
        <div>
          <h1 style={{ fontSize: 30 }}>Monday</h1>
          <Spacer size={Spacing.l} />
          {mondayList}
        </div>
      )}
      {tuesdayList && (
        <div>
          <Spacer size={Spacing.xl} />
          <h1 style={{ fontSize: 30 }}>Tuesday</h1>
          <Spacer size={Spacing.l} />
          {tuesdayList}
        </div>
      )}
      {wednesdayList && (
        <div>
          <Spacer size={Spacing.xl} />
          <h1 style={{ fontSize: 30 }}>Wednesday</h1>
          <Spacer size={Spacing.l} />
          {wednesdayList}
        </div>
      )}
      {thursdayList && (
        <div>
          <Spacer size={Spacing.xl} />
          <h1 style={{ fontSize: 30 }}>Thursday</h1>
          <Spacer size={Spacing.l} />
          {thursdayList}
        </div>
      )}
      {fridayList && (
        <div>
          <Spacer size={Spacing.xl} />
          <h1 style={{ fontSize: 30 }}>Friday</h1>
          <Spacer size={Spacing.l} />
          {fridayList}
        </div>
      )}
      <Spacer size={Spacing.m} />
    </Container>
  );
};
