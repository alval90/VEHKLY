import Cookies from "universal-cookie";

export const getMealPlan = async (year : string, week : string): Promise<globalThis.Response> => {
  const cookies = new Cookies();
  return await fetch(`/api/mealplan/${year}/${week}`, {
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