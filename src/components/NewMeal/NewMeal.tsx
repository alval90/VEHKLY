import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerSize } from '../Container/Container';
import { Spacer, Spacing } from '../Spacer/Spacer';
import './NewMeal.css';
import defaultImage from '../../images/defaultImage.jpg';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export const NewMeal: React.FC<{}> = () => {
  const [recipeImage, setRecipeImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [recipeDescription, setRecipeDescription] = useState<string>();

  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const handleImageChang = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setRecipeImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submitted');
  };

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleRecipeDescriptionChange = (e: any) => {
    e.preventDefault();
    setRecipeDescription(e.target.value);
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
            <div>
              <img
                id="recipeImage"
                src={preview ? preview : defaultImage}
                onClick={handleImageClick}
              />
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileRef}
                onChange={handleImageChang}
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
          <Spacer size={Spacing.s} />
          <div className={'RecipeFormPart'}>
            <h2>Ingredients</h2>
          </div>
          <Spacer size={Spacing.s} />
          <div className={'RecipeFormPart'}>
            <h2>Recipe</h2>
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
      </div>
    </Container>
  );
};
