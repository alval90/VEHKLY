import React, { useEffect, useState } from 'react';
import { Container, ContainerSize } from '../Container/Container';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../utils/hooks';
import { Spacer, Spacing } from '../Spacer/Spacer';
import {MealView} from "../MealDetailView/MealDetailView";

export const MealList = () => {
  let [meal, setMeal] = useState();

  let navigate = useNavigate();
  let query = useQuery();

  let weekReturnedMock = require('./MockData/weekReturned.json');

  useEffect(() => {
    let year = query.get('year');
    let month = query.get('month');

    // TODO: fetch meal info

    //setMeal(weekReturnedMock);
  });

  const handleClick = (e: any) => {
    navigate(-1);
  };

  return (
    <Container size={ContainerSize.Small}>
      <Spacer size={Spacing.m} />
      <p
        onClick={handleClick}
        style={{
          paddingLeft: '20px',
          alignSelf: 'baseline',
          color: 'blue',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        ← back
      </p>
      {meal && <MealView meal={meal} />}
      <Spacer size={Spacing.m} />
    </Container>
  );
};