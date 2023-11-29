import App from "./components/App/App.tsx";
import "../index.css";
import { Startpage } from "./components/Startpage/Startpage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Login } from "./components/Login/Login.tsx";
import { Register } from "./components/Register/Register.tsx";
import { MealPlan } from "./components/MealPlan/MealPlan.tsx";
import { AddMeal } from "./components/AddMeal/AddMeal.tsx";
import { NewMeal } from "./components/NewMeal/NewMeal.tsx";
import { MealDetailView } from "./components/MealDetailView/MealDetailView.tsx";
import { MealList } from "./components/MealList/MealList.tsx";
/*import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Startpage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'mealplan/:year/:week',
        element: <MealPlan />
      },
      {
        path: 'mealplan/:year/:week/addmeal',
        element: <AddMeal />
      },
      {
        path: 'newmeal',
        element: <NewMeal />
      },
      {
        path: 'mealview',
        element: <MealDetailView />
      },
      {
        path: 'list',
        element: <MealList />
      }
    ]
  },
], {basename: "/static/"});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);*/

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Startpage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "mealplan/:year/:week",
        element: <MealPlan />,
      },
      {
        path: "mealplan/:year/:week/addmeal",
        element: <AddMeal />,
      },
      {
        path: "newmeal",
        element: <NewMeal />,
      },
      {
        path: "mealview",
        element: <MealDetailView />,
      },
      {
        path: "list",
        element: <MealList />,
      },
    ],
  },
]); // TODO: basename needs to be removed in prod

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
