import React, { useEffect, useState } from 'react';
import { Container, ContainerSize } from '../Container/Container';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../utils/hooks';
import { Spacer, Spacing } from '../Spacer/Spacer';
import { MealView } from '../MealDetailView/MealDetailView';
import { Meal } from '../AddMeal/AddMeal';
import { BackButton } from '../BackButton/BackButton';

import weekReturnedMock from './MockData/weekReturned.json';

export const MealList = () => {
  let [mondayMeals, setMondayMeals] = useState<Meal[]>();
  let [tuesdayMeals, setTuesdayMeals] = useState<Meal[]>();
  let [wednesdayMeals, setWednesdayMeals] = useState<Meal[]>();
  let [thursdayMeals, setThursdayMeals] = useState<Meal[]>();
  let [fridayMeals, setFridayMeals] = useState<Meal[]>();

  let navigate = useNavigate();
  let query = useQuery();
  useEffect(() => {
    let year = query.get('year');
    let month = query.get('month');

    // TODO: fetch meal info

    for (let meal of weekReturnedMock) {
      let { breakfast, lunch, dinner } = meal;
      let mealsUpdated = [breakfast, lunch, dinner].filter(
        (meal) => meal !== null
      );
      switch (meal.day) {
        case 'Monday':
          setMondayMeals(mealsUpdated);
          break;
        case 'Tuesday':
          setTuesdayMeals(mealsUpdated);
          break;
        case 'Wednesday':
          setWednesdayMeals(mealsUpdated);
          break;
        case 'Thursday':
          setThursdayMeals(mealsUpdated);
          break;
        case 'Friday':
          setFridayMeals(mealsUpdated);
          break;
      }
    }
  });

  let mondayList = mondayMeals?.map((meal) => <MealView meal={meal} />);
  let tuesdayList = tuesdayMeals?.map((meal) => <MealView meal={meal} />);
  let wednesdayList = wednesdayMeals?.map((meal) => <MealView meal={meal} />);
  let thursdayList = thursdayMeals?.map((meal) => <MealView meal={meal} />);
  let fridayList = fridayMeals?.map((meal) => <MealView meal={meal} />);

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
