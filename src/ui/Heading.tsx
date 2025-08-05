import styled, { css } from "styled-components";

type HeadingProps = {
  $size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};

const Heading = styled.h1<HeadingProps>`
  ${({ $size = "lg" }) => {
    switch ($size) {
      case "2xl":
        return css`
          font-size: 3rem;
          font-weight: 600;
        `;
      case "xl":
        return css`
          font-size: 2rem;
          font-weight: 600;
        `;
      case "lg":
        return css`
          font-size: 2rem;
          font-weight: 500;
        `;
      default:
        return "";
    }
  }}
`;

export default Heading;
