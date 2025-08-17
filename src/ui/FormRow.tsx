import { isValidElement, type ReactElement, type ReactNode } from "react";

import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

//------------------------------------------------------------------------------------------------

type FormRowProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

// Define expected child props
interface ElementProps {
  id?: string;
  [key: string]: unknown;
}

// Type guard with proper typing
const isReactElementWithProps = (
  child: ReactNode
): child is ReactElement<ElementProps> => {
  return isValidElement(child);
};

const FormRow = ({ label, error, children }: FormRowProps) => {
  let childId: string | undefined;
  if (isReactElementWithProps(children) && children.props.id) {
    childId = children.props.id;
  }

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
