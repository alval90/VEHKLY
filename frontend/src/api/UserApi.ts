import Cookies from "universal-cookie";

const cookies = new Cookies();

export interface User {
  username: string;
  password: string;
}

export const login = async (userData: User): Promise<globalThis.Response> => {
  return await fetch("/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
    }),
  }).then((res: globalThis.Response) => {
    return res;
  });
};

export const logout = async (): Promise<globalThis.Response> => {
  return await fetch("/api/logout/", {
    credentials: "same-origin",
  }).then((res) => {
    return res;
  });
};

export const register = async (
  userData: User,
): Promise<globalThis.Response> => {
  return await fetch("/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
    }),
  }).then((res) => {
    return res;
  });
};
