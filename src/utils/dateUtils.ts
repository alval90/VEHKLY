export const getCurrentWeekMealPlanURL = () : string => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const startOfCurrentYear = new Date(currentYear, 0, 1);
  const timeSinceStartOfYear = now.getTime() - startOfCurrentYear.getTime();
  const currentWeek = Math.ceil(timeSinceStartOfYear / (7 * 24 * 60 * 60 * 1000));

  return `/mealplan/${currentYear}/${currentWeek}`;
}