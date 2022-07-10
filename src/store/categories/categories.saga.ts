import { takeLatest, all, call, put } from 'typed-redux-saga/macro'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesFailed, fetchCategoriesSuccess } from './categories.action';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
   try {
     const categoriesArray = yield* call(getCategoriesAndDocuments, "categories"); // call = await
     yield* put(fetchCategoriesSuccess(categoriesArray)) // put = dispatch
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

// watcher (waits for type in 1st param, then executes func. in 2nd param)
export function* onFetchCategories() {
  yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync); 
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]); // run everything inside and continue only when everything is done; will track all sagas
}
