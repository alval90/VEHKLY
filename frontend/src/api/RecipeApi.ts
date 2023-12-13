import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getRecipes = async (): Promise<globalThis.Response> => {
  return await fetch("/api/recipe/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
  }).then((res: globalThis.Response) => {
    return res;
  });
};

export const getRecipe = async (
  recipeName: string,
): Promise<globalThis.Response> => {
  return await fetch(`/api/recipe/${recipeName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
  }).then((res: globalThis.Response) => {
    return res;
  });
};

export const deleteRecipe = async (
  recipeName: string,
): Promise<globalThis.Response> => {
  return await fetch(`/api/recipe/${recipeName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
  }).then((res: globalThis.Response) => {
    return res;
  });
};

export const postRecipe = async (formData: FormData) => {
  const cookies = new Cookies();
  return await fetch(`/api/recipe/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
    body: formData,
  }).then((res: globalThis.Response) => {
    return res;
  });
};
