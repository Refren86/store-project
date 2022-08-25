import styled from "styled-components";
import Button from "../button/button";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;

  @media screen and (max-width: 600px) {
    min-width: 300px;
  }

  h2 {
    @media screen and (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
