import Cookies from "universal-cookie";

export const getMealPlan = async (
  year: string,
  week: string,
): Promise<globalThis.Response> => {
  const cookies = new Cookies();
  return await fetch(`/api/mealplan/${year}/${week}`, {
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

export const putMealPlan = async (
  year: string,
  week: string,
  day: string,
  mealType: string,
  title: string | null,
): Promise<globalThis.Response> => {
  const cookies = new Cookies();
  return await fetch(`/api/mealplan/${year}/${week}/${day}/${mealType}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
    body: JSON.stringify({ title: title }),
  }).then((res: globalThis.Response) => {
    return res;
  });
};
