import { createSelector } from "reselect";

import { CategoryMap } from "./categories.types";
import { RootState } from "../store";
import { CategoriesState } from "./categories.reducer";

// memoize categories from the state
const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category; // items = array of objects of specific product(shoes, hats, etc.)
      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

// this will make a nested object from array of objects
// export const selectCategoriesMap = (state) => {
//   console.log("selector fired");
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category; // items = array of objects of specific product(shoes, hats, etc.)
//     acc[title.toLowerCase()] = items;

//     return acc;
//   }, {});
// };
