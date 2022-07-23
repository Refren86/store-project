import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

// if any of these buttons are children of this component, apply style to them
export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const CartMessage = styled.p`
  text-align: center;
`;
