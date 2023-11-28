import React, { createContext, ReactNode, useContext, useState } from 'react';
import Cookies from "universal-cookie";
import {Http2ServerResponse} from "http2";
interface User {
  username: String;
  password: String;
}
export interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const cookies = new Cookies();

  const isResponseOk = (response : any) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  const login = (userData: User) => {
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({username: userData.username, password: userData.password})
    })
      .then(res => isResponseOk(res))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
      .then(res => isResponseOk(res))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const test = useContext(AuthContext);
  if (!test) {
    throw new Error('Test');
  }
  return test;
};
