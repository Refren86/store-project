import { takeLatest, put, call, all } from "typed-redux-saga/macro";

import { User } from "firebase/auth";
import USER_ACTION_TYPES from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    // if user already exists in firebase auth DB, it returns as snapshot, if not creates one and returns as well
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    ); // { fn: createUserDocumentFromAuth, params: [] }

    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      ); // id can only be extracted from snapshot/doc
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;

    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* logInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);

    yield* call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

// as a parameter it gets action, from where payload can be extracted
export function* logInWithEmailAndPassword({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (err) {
    yield* put(signUpFailed(err as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (err) {
    yield* put(signOutFailed(err as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated); // listening for type USER_ACTION_TYPES.CHECK_USER_SESSION
}

export function* onGoogleLogInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, logInWithGoogle);
}

export function* onEmailLogInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    logInWithEmailAndPassword
  );
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleLogInStart),
    call(onEmailLogInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
