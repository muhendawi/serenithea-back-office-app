import styled, { css } from "styled-components";

type RowProps = {
  $type?: "horizontal" | "vertical";
};

const Row = styled.div<RowProps>`
  display: flex;
  /* Since we using TS, instead of using Row.defaultProps to set the default prop we 
  set it like { $type = "vertical" } in the destructuring props in the interpolation */
  ${({ $type = "vertical" }) => {
    switch ($type) {
      case "horizontal":
        return css`
          justify-content: space-between;
          align-items: center;
        `;
      case "vertical":
        return css`
          flex-direction: column;
          gap: 1.6rem;
        `;
    }
  }}
`;

export default Row;
