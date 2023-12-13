import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../Container/Container";
import { Spacer } from "../Spacer/Spacer";
import { Spacing } from "../Spacer/Spacing.ts";
import { Pagination } from "@mui/material";
import { MediaCard } from "../MediaCard/MediaCard";
import { ActionCard } from "../ActionCard/ActionCard";
import YearMenu from "../Menu/YearMenu";
import Button from "@mui/material/Button";
import { getMealPlan, putMealPlan } from "../../api/MealPlan.ts";
import { MealDay, MealType } from "../../utils/Meals.ts";
import { logout } from "../../api/UserApi.ts";
import { ContainerSize } from "../Container/ContainerSize.tsx";
import { MealPlanInterface } from "../../utils/Meals.ts";

const getMealIndex = (mealDay: MealDay): number => {
  switch (mealDay) {
    case MealDay.Monday:
      return 0;
    case MealDay.Tuesday:
      return 1;
    case MealDay.Wednesday:
      return 2;
    case MealDay.Thursday:
      return 3;
    case MealDay.Friday:
      return 4;
    default:
      return -1;
  }
};

const getMealDay = (day: string): MealDay => {
  switch (day) {
    case "monday":
      return MealDay.Monday;
    case "tuesday":
      return MealDay.Tuesday;
    case "wednesday":
      return MealDay.Wednesday;
    case "thursday":
      return MealDay.Thursday;
    case "friday":
      return MealDay.Friday;
    default:
      return MealDay.Monday;
  }
};

export const MealPlan: React.FC = () => {
  const { year, week } = useParams();
  const navigate = useNavigate();

  const [breakfast, setBreakfast] = useState<JSX.Element[]>([
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=breakfast&day=monday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=breakfast&day=tuesday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=breakfast&day=wednesday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=breakfast&day=thursday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=breakfast&day=friday"}
    />,
  ]);
  const [lunch, setLunch] = useState<JSX.Element[]>([
    <ActionCard label={"+ Add meal"} href={"addMeal?type=lunch&day=monday"} />,
    <ActionCard label={"+ Add meal"} href={"addMeal?type=lunch&day=tuesday"} />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=lunch&day=wednesday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=lunch&day=thursday"}
    />,
    <ActionCard label={"+ Add meal"} href={"addMeal?type=lunch&day=friday"} />,
  ]);
  const [dinner, setDinner] = useState<JSX.Element[]>([
    <ActionCard label={"+ Add meal"} href={"addMeal?type=dinner&day=monday"} />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=dinner&day=tuesday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=dinner&day=wednesday"}
    />,
    <ActionCard
      label={"+ Add meal"}
      href={"addMeal?type=dinner&day=thursday"}
    />,
    <ActionCard label={"+ Add meal"} href={"addMeal?type=dinner&day=friday"} />,
  ]);

  const initMeals = useCallback(
    (mealPlan: MealPlanInterface[]) => {
      const removeMeal = (mealDay: MealDay, mealType: MealType) => {
        switch (mealType) {
          case MealType.breakfast:
            if (year && week) {
              putMealPlan(
                year,
                week,
                mealDay.toString(),
                mealType.toString(),
                null,
              )
                .then((res) => res.json())
                .then(() => {
                  getMealPlan(year, week)
                    .then((res) => res.json())
                    .then(initMeals);
                });
            }
            break;
          case MealType.lunch:
            if (year && week) {
              putMealPlan(
                year,
                week,
                mealDay.toString(),
                mealType.toString(),
                null,
              )
                .then((res) => res.json())
                .then(() => {
                  getMealPlan(year, week)
                    .then((res) => res.json())
                    .then(initMeals);
                });
            }
            break;
          case MealType.dinner:
            if (year && week) {
              putMealPlan(
                year,
                week,
                mealDay.toString(),
                mealType.toString(),
                null,
              )
                .then((res) => res.json())
                .then(() => {
                  getMealPlan(year, week)
                    .then((res) => res.json())
                    .then(initMeals);
                });
            }
            break;
        }
      };

      const initBreakfast = [
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=breakfast&day=monday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=breakfast&day=tuesday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=breakfast&day=wednesday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=breakfast&day=thursday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=breakfast&day=friday"}
        />,
      ];
      const initLunch = [
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=lunch&day=monday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=lunch&day=tuesday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=lunch&day=wednesday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=lunch&day=thursday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=lunch&day=friday"}
        />,
      ];
      const initDinner = [
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=dinner&day=monday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=dinner&day=tuesday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=dinner&day=wednesday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=dinner&day=thursday"}
        />,
        <ActionCard
          label={"+ Add meal"}
          href={"addMeal?type=dinner&day=friday"}
        />,
      ];

      for (const meal of mealPlan) {
        const mealDay: MealDay = getMealDay(meal.day);
        const mealIndex = getMealIndex(mealDay);
        const { breakfast, lunch, dinner } = meal;
        if (breakfast !== null) {
          const { imagePath, title } = breakfast;
          initBreakfast[mealIndex] = (
            <MediaCard
              imagePath={imagePath}
              imageTitle={title}
              clickEvent={() => removeMeal(mealDay, MealType.breakfast)}
            />
          );
        }
        if (lunch !== null) {
          const { imagePath, title } = lunch;
          initLunch[mealIndex] = (
            <MediaCard
              imagePath={imagePath}
              imageTitle={title}
              clickEvent={() => removeMeal(mealDay, MealType.lunch)}
            />
          );
        }
        if (dinner !== null) {
          const { imagePath, title } = dinner;
          initDinner[mealIndex] = (
            <MediaCard
              imagePath={imagePath}
              imageTitle={title}
              clickEvent={() => removeMeal(mealDay, MealType.dinner)}
            />
          );
        }
      }
      setBreakfast(initBreakfast);
      setLunch(initLunch);
      setDinner(initDinner);
    },
    [week, year],
  );

  useEffect(() => {
    if (!year || !week) {
      return;
    } else {
      getMealPlan(year, week)
        .then((res) => res.json())
        .then(initMeals);
    }
  }, [year, week, initMeals]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/mealplan/${year}/${value}`);
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const dayLabelRow = days.map((day) => dayLabel({ day }));
  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <YearMenu />
      <h1>MealWeek</h1>
      <Spacer size={Spacing.s} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={52}
          page={Number(week)}
          onChange={handleChange}
          color={"primary"}
          shape="rounded"
        />
      </div>
      <Spacer size={Spacing.m} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          alignSelf: "center",
        }}
      >
        {dayLabelRow}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          alignSelf: "center",
        }}
      >
        {breakfast}
      </div>
      <Spacer size={Spacing.s} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          alignSelf: "center",
        }}
      >
        {lunch}
      </div>
      <Spacer size={Spacing.s} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          alignSelf: "center",
        }}
      >
        {dinner}
      </div>
      <Spacer size={Spacing.xl} />
      <Button
        onClick={() => navigate(`/list?year=${year}&week=${week}`)}
        style={{ alignSelf: "center", width: "140px" }}
        variant="contained"
      >
        Create List
      </Button>
      <Spacer size={Spacing.xs} />
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          logout()
            .then((res) => res.json())
            .then(() => {
              navigate("/");
            });
        }}
      >
        Logout
      </p>
      <Spacer size={Spacing.s} />
    </Container>
  );
};

interface DayProps {
  day: string;
}
const dayLabel: React.FC<DayProps> = ({ day }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "140px",
        height: "40px",
      }}
    >
      {day}
    </div>
  );
};
