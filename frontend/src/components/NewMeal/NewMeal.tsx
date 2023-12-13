import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import { Spacer } from "../Spacer/Spacer";
import "./NewMeal.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { BackButton } from "../BackButton/BackButton";
import { postRecipe } from "../../api/RecipeApi.ts";
import { Spacing } from "../Spacer/Spacing.ts";
import { ContainerSize } from "../Container/ContainerSize.tsx";
import { Ingredient } from "../../utils/Meals.ts";
import { HttpStatusCode } from "../../api/HttpStatusCodes.ts";

export const NewMeal: React.FC = () => {
  const [recipeImage, setRecipeImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState(false);
  const [titleHelperText, setTitleHelperText] = useState("");
  const [recipeDescription, setRecipeDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      title: "",
      amount: "",
    },
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (recipeImage) {
      formData.append("imagePath", recipeImage);
    }
    formData.append("title", title);
    formData.append("description", recipeDescription);
    for (const ingredient of ingredients) {
      formData.append("ingredients", JSON.stringify(ingredient));
    }
    postRecipe(formData)
      .then((res) => {
        if (res.status == HttpStatusCode.OK) {
          return res.json();
        } else {
          throw Error("Recipe title already in use");
        }
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        setTitleError(true);
        setTitleHelperText(err.message);
      });
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (titleError) {
      setTitleError(false);
      setTitleHelperText("");
    }
    setTitle(e.target.value);
  };

  const handleRecipeDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    setRecipeDescription(e.target.value);
  };

  const handleIngredientTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const ingredientsUpdated = [...ingredients];
    ingredientsUpdated[index].title = e.target.value;
    setIngredients(ingredientsUpdated);
  };

  const handleIngredientAmountChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const ingredientsUpdated = [...ingredients];
    ingredientsUpdated[index].amount = e.target.value;
    setIngredients(ingredientsUpdated);
  };

  const ingredientInput = ingredients.map((ingredient, index) => (
    <div>
      <Spacer size={Spacing.s} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
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
          <p style={{ color: "lightgrey", fontWeight: 700, cursor: "default" }}>
            Remove
          </p>
        )}
        {index !== 0 && (
          <p
            style={{ color: "red", fontWeight: 700, cursor: "pointer" }}
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
    const ingredientsUpdated = [...ingredients];
    ingredientsUpdated.splice(index, 1);
    setIngredients(ingredientsUpdated);
  };

  const handleIngredientClick = () => {
    const ingredientsUpdated = [...ingredients];
    ingredientsUpdated.push({ title: "", amount: "" });
    setIngredients(ingredientsUpdated);
  };

  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <BackButton />
      <h1>New Meal</h1>
      <Spacer size={Spacing.s} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <form method={"post"} onSubmit={handleSubmit}>
          <div className={"RecipeFormPart"}>
            <h2>General</h2>
            <Spacer size={Spacing.s} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <img
                  id="recipeImage"
                  src={
                    preview
                      ? preview
                      : "https://dummyimage.com/600x400/8a8a8a/fff.jpg&text=Upload+Image"
                  }
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
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
                error={titleError}
                helperText={titleHelperText}
                variant="filled"
              />
            </div>
          </div>
          <Spacer size={Spacing.s} />
          <div className={"RecipeFormPart"}>
            <h2>Ingredients</h2>
            <Spacer size={Spacing.s} />
            {ingredientInput}
            <p
              style={{ fontWeight: 700, cursor: "pointer" }}
              onClick={handleIngredientClick}
            >
              + Add ingredient
            </p>
          </div>
          <Spacer size={Spacing.s} />
          <div className={"RecipeFormPart"}>
            <h2>Recipe</h2>
            <Spacer size={Spacing.s} />
            <TextField
              id="filled-multiline-static"
              label="Recipe"
              multiline
              rows={4}
              variant="filled"
              onChange={handleRecipeDescriptionChange}
              style={{ width: "100%" }}
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
