import React, { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "universal-cookie";
interface User {
  username: string;
  password: string;
}
export interface AuthContextProps {
  username: string | null;
  register: (userData: User) => Promise<globalThis.Response>;
  login: (userData: User) => Promise<globalThis.Response>;
  logout: () => Promise<globalThis.Response>;
}

export enum HttpStatusCode {
  OK = 200,
  CONFLICT = 409,
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  const cookies = new Cookies();

  const login = async (userData: User): Promise<globalThis.Response> => {
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
    })
      .then((res: globalThis.Response) => {
        if (res.status == HttpStatusCode.OK) {
          setUsername(userData.username);
        }
        return res;
      })
      .catch((err) => {
        console.log("in auth context");
      });
  };

  const logout = async (): Promise<globalThis.Response> => {
    return await fetch("/api/logout/", {
      credentials: "same-origin",
    }).then((res) => {
      return res;
    });
  };

  const register = async (userData: User): Promise<globalThis.Response> => {
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

  return (
    <AuthContext.Provider value={{ username, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const test = useContext(AuthContext);
  if (!test) {
    throw new Error("Test");
  }
  return test;
};
