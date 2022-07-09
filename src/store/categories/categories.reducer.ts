import { AnyAction } from "redux";

import { Category } from "./categories.types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = initialState,
  action = {} as AnyAction // reducer can receive any type of actions, and then it compares it with action creators inside
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) { // if action creator matches with action
    // action = FetchCategoriesStart
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    // action = FetchCategoriesSuccess
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    // action = FetchCategoriesFailed
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;

  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return { ...state, isLoading: true };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return { ...state, categories: action.payload, isLoading: false };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return { ...state, error: action.payload, isLoading: false };
  //   default:
  //     return state;
  // }
};
