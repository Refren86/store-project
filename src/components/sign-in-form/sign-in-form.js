import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import FormInput from "../form-input/form-input";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("Incorrect email");
          break;
        default:
          console.log(err);
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account</h2>
      <span>Sign In with your Email and Password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>

          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.GOOGLE}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
