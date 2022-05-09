import { takeLatest, put, call, all } from "redux-saga/effects";

import USER_ACTION_TYPES from "./user.types";

import { signInSuccess, signInFailed } from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    // if user already exists in firebase auth DB, it returns as snapshot, if not creates one and returns as well
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    ); // { fn: createUserDocumentFromAuth, params: [] }

    // console.log("===================================");
    // console.log("USER SNAPSHOT: ", userSnapshot);
    // console.log("===================================");

    // console.log("===================================");
    // console.log("USER SNAPSHOT DATA: ", userSnapshot.data());
    // console.log("===================================");

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })); // id can only be extracted from snapshot/doc
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* logInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);

    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

// as a parameter it gets action, from where payload can be extracted
export function* logInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated); // listening for type USER_ACTION_TYPES.CHECK_USER_SESSION
}

export function* onGoogleLogInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, logInWithGoogle);
}

export function* onEmailLogInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    logInWithEmailAndPassword
  );
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleLogInStart),
    call(onEmailLogInStart),
  ]);
}
