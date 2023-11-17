import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { AuthProvider } from './contexts/AuthContext';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Startpage } from './components/Startpage/Startpage';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { MealPlan } from './components/MealPlan/MealPlan';
import { AddMeal } from './components/AddMeal/AddMeal';
import { NewMeal } from './components/NewMeal/NewMeal';
import { MealDetailView } from './components/MealDetailView/MealDetailView';
import {MealList} from "./components/MealList/MealList";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App />,
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
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
