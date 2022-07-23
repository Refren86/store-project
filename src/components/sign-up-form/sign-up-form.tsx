import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { SignUpContainer } from "./sign-up-form.styles";

import { signUpStart } from "../../store/user/user.action";

type SignUpForm = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState<SignUpForm>(defaultFormField);
  const { displayName, confirmPassword, email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("Error occurred while creating new user ", err);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up with your Email and Password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
