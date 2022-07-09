import React from "react";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

type ButtonProps = {
  children: string;
  buttonType: string;
  isLoading: boolean;
}

// default button, inverted, sign-in
export const BUTTON_TYPE_CLASSES = {
  BASE: "base",
  GOOGLE: "google-sign-in",
  INVERTED: "inverted",
};

// based on a button type, return me specific button component
const getButton = (buttonType = BUTTON_TYPE_CLASSES.BASE) =>
  ({
    [BUTTON_TYPE_CLASSES.BASE]: BaseButton,
    [BUTTON_TYPE_CLASSES.GOOGLE]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.INVERTED]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }: ButtonProps) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
