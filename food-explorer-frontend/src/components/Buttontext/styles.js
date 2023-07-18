import styled from "styled-components";

export const Container = styled.button`
  border: none;
  background: none;

  font-weight: 500;
  font-family: "Poppins", sans-serif;
  line-height: 140%;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  display: flex;
  align-items: center;
  > svg {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
  @media (min-width: 1024px) {
    font-weight: 700;
  }
`;
