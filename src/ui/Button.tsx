import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

type ButtonProps = {
  $size?: "medium" | "small" | "large";
  $variation?: "primary" | "secondary" | "danger";
};

const Button = styled.button<ButtonProps>`
  position: relative;
  border: none;
  border-radius: 4rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  z-index: 1;
  ${({ $size = "medium" }) => sizes[$size]};
  /* ${({ $variation = "primary" }) => variations[$variation]}; */
  transition: 0.5s ease;

  &::before {
    content: "";
    width: 0;
    height: 100%;
    border-radius: 4rem;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, var(--color-brand-500) 0%);
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }
  &:hover {
    color: var(--color-brand-100);
  }
`;

export default Button;
