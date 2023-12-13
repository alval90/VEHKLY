export enum MealDay {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
}

export enum MealType {
  breakfast = "breakfast",
  lunch = "lunch",
  dinner = "dinner",
}

export interface MealPlanInterface {
  day: string;
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

export interface Meal {
  title: string;
  description: string | null;
  imagePath: string | null;
  ingredients: Ingredient[];
}

export interface Ingredient {
  title: string;
  amount: string;
}
