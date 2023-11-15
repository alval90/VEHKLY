import React, {useEffect, useState} from 'react';
import {Container, ContainerSize} from "../Container/Container";
import {useAuth} from "../../contexts/AuthContext";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Spacer, Spacing} from "../Spacer/Spacer";
import {ActionCard} from "../ActionCard/ActionCard";
import {MediaCard} from "../MediaCard/MediaCard";
import {TextField} from "@mui/material";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface Meal {
  "title": string;
  "description": string | null;
  "imagePath": string | null;
  "ingredients": Ingredient[];
}

interface Ingredient {
  title: string;
  amount: string;
}

export const AddMeal : React.FC<{}> = () => {
  let [meals, setMeals] = useState<Meal[]>();
  const [searchInput, setSearchInput] = useState('');

  const { user } = useAuth();
  const { year, week } = useParams();
  const query = useQuery();
  const navigate = useNavigate();

  let mockMeals = require('./MockData/meals.json');

  useEffect(() => {
    /*if (!user) {
      navigate("/login");
    }*/
    setMeals(mockMeals);
  },[mockMeals]);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const addMeal = (mealTitle: string) => {
    // TODO: post meal to db
    // use year and week url params + query params
    navigate(-1);
  }

  const mealCards = meals?.filter(meal => meal.title.toLowerCase().includes(searchInput.toLowerCase())).map(meal => <MediaCard imagePath={meal.imagePath} imageTitle={meal.title} actionLabel={"Add"} clickEvent={() => addMeal(meal.title)} />);

  return (
    <Container size={ContainerSize.Big} >
      <Spacer size={Spacing.m} />
      <h1>Meals</h1>
      <Spacer size={Spacing.s} />
      <div>
        <TextField
            id="outlined-basic"
            label="Search"
            onChange={handleSearchChange}
            value={searchInput}
            variant="filled"
            style={{width:"300px"}}
          />
      </div>
      <Spacer size={Spacing.m} />
      <div style={{display: "grid", gridGap: "30px",gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", marginLeft:"38px"}}>
        <ActionCard label={"+ New meal"} href={"/newmeal"} />
        {mealCards}
      </div>
      <Spacer size={Spacing.m} />
    </Container>
  )
}