import { createSelector } from "reselect";

// memoize categories from the state
const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category; // items = array of objects of specific product(shoes, hats, etc.)
      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
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
