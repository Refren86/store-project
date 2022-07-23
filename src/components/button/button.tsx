import React, { FC, ButtonHTMLAttributes } from "react";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

// default button, inverted, sign-in
export enum BUTTON_TYPE_CLASSES {
  BASE = "base",
  GOOGLE = "google-sign-in",
  INVERTED = "inverted",
}

// based on a button type, return me specific button component; all 3 buttons are of type BaseButton
const getButton = (buttonType = BUTTON_TYPE_CLASSES.BASE): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.BASE]: BaseButton,
    [BUTTON_TYPE_CLASSES.GOOGLE]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.INVERTED]: InvertedButton,
  }[buttonType]);

// ButtonHTMLAttributes<HTMLButtonElement> - types for all button attributes (for ...otherProps)
export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}: ButtonProps) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
