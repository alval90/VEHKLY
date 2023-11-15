import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerSize } from '../Container/Container';
import { Spacer, Spacing } from '../Spacer/Spacer';
import './NewMeal.css';
import defaultImage from '../../images/defaultImage.jpg';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Ingredient } from '../AddMeal/AddMeal';

export const NewMeal: React.FC<{}> = () => {
  const [recipeImage, setRecipeImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [recipeDescription, setRecipeDescription] = useState<string>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      title: '',
      amount: ''
    }
  ]);

  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setRecipeImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO add POST logic
    console.log('submitted');
    navigate(-1);
  };

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleRecipeDescriptionChange = (e: any) => {
    e.preventDefault();
    setRecipeDescription(e.target.value);
  };

  const handleIngredientTitleChange = (e: any, index: number) => {
    let ingredientsUpdated = [...ingredients];
    ingredientsUpdated[index].title = e.target.value;
    setIngredients(ingredientsUpdated);
  };

  const handleIngredientAmountChange = (e: any, index: number) => {
    let ingredientsUpdated = [...ingredients];
    ingredientsUpdated[index].amount = e.target.value;
    setIngredients(ingredientsUpdated);
  };

  let ingredientInput = ingredients.map((ingredient, index) => (
    <div>
      <Spacer size={Spacing.s} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <TextField
          required
          id="outlined-basic"
          label="Ingredient"
          onChange={(e) => handleIngredientTitleChange(e, index)}
          value={ingredient.title}
          variant="filled"
        />
        <TextField
          required
          id="outlined-basic"
          label="Amount"
          onChange={(e) => handleIngredientAmountChange(e, index)}
          value={ingredient.amount}
          variant="filled"
        />
        {index === 0 && (
          <p style={{ color: 'lightgrey', fontWeight: 700, cursor: 'default' }}>
            Remove
          </p>
        )}
        {index !== 0 && (
          <p
            style={{ color: 'red', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => handleRemoveIngredientClick(index)}
          >
            Remove
          </p>
        )}
      </div>
      <Spacer size={Spacing.s} />
    </div>
  ));

  const handleRemoveIngredientClick = (index: number) => {
    let ingredientsUpdated = [...ingredients];
    ingredientsUpdated.splice(index, 1);
    setIngredients(ingredientsUpdated);
  };

  const handleIngredientClick = (e: any) => {
    let ingredientsUpdated = [...ingredients];
    ingredientsUpdated.push({ title: '', amount: '' });
    setIngredients(ingredientsUpdated);
  };

  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <h1>New Meal</h1>
      <Spacer size={Spacing.s} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <form method={'post'} onSubmit={handleSubmit}>
          <div className={'RecipeFormPart'}>
            <h2>General</h2>
            <Spacer size={Spacing.s} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
            >
              <div>
                <img
                  id="recipeImage"
                  src={preview ? preview : "https://dummyimage.com/600x400/8a8a8a/fff.jpg&text=Upload+Image"}
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </div>
              <TextField
                required
                id="outlined-basic"
                label="Title"
                onChange={handleTitleChange}
                value={title}
                variant="filled"
              />
            </div>
          </div>
          <Spacer size={Spacing.s} />
          <div className={'RecipeFormPart'}>
            <h2>Ingredients</h2>
            <Spacer size={Spacing.s} />
            {ingredientInput}
            <p
              style={{ fontWeight: 700, cursor: 'pointer' }}
              onClick={handleIngredientClick}
            >
              + Add ingredient
            </p>
          </div>
          <Spacer size={Spacing.s} />
          <div className={'RecipeFormPart'}>
            <h2>Recipe</h2>
            <Spacer size={Spacing.s} />
            <TextField
              id="filled-multiline-static"
              label="Recipe"
              multiline
              rows={4}
              variant="filled"
              onChange={handleRecipeDescriptionChange}
              style={{ width: '100%' }}
            />
          </div>
          <Spacer size={Spacing.s} />
          <Button type="submit" variant="contained">
            CREATE
          </Button>
        </form>
        <Spacer size={Spacing.m} />
      </div>
    </Container>
  );
};
