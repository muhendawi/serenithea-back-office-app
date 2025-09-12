import styled, { css } from "styled-components";

type FormProps = {
  $type?: "default" | "modal";
};

const Form = styled.form<FormProps>`
  ${({ $type = "default" }) => {
    switch ($type) {
      case "default":
        return css`
          padding: 2.4rem 4rem;

          /* Box */
          background-color: var(--color-grey-0);
          border: 1px solid var(--color-grey-200);
          border-radius: 4rem;
        `;
      case "modal":
        return css`
          width: 80rem;
        `;

      default:
        break;
    }
  }}

  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
