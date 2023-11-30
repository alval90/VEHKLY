import Cookies from "universal-cookie";

export const getRecipes = async (): Promise<globalThis.Response> => {
  const cookies = new Cookies();
  return await fetch("/api/recipe/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
  })
    .then((res: globalThis.Response) => {
      return res;
    });
}

export const getRecipe = async (recipeName : string): Promise<globalThis.Response> => {
  const cookies = new Cookies();
  return await fetch(`/api/recipe/${recipeName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
  })
    .then((res: globalThis.Response) => {
      return res;
    });
}

export const deleteRecipe = async (recipeName : string): Promise<globalThis.Response> => {
  const cookies = new Cookies();
  return await fetch(`/api/recipe/${recipeName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
  })
    .then((res: globalThis.Response) => {
      return res;
    });
}