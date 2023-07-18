import styled from "styled-components";

export const Container = styled.button`
  border: 0;
  background: none;
  border-radius: 0.5rem;

  justify-content: center;
  display: flex;
  align-items: center;
  
  padding: 1.4rem 2.5rem;
  width: 100%;
  
  background-color:#065E7C;
  color: ${({ theme }) => theme.COLORS.WHITE};

  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  line-height: 2.3rem;
  position: relative;

  > span {
    right: -0.6rem;
    position: absolute;
    top: -0.4rem;
    background-color: ${({ theme }) => theme.COLORS.DARK_RED};
    padding-inline: 0.6rem;
    border-radius: 99px;
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (min-width: 1024px) {
    padding: 1.2rem 3.2rem;
    gap: 0.8rem;
    
    > span {
      padding-inline: 0;
      position: initial;
    }
  }
`;