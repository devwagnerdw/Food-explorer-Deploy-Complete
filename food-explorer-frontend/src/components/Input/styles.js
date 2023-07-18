import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 0.6rem;
  
  > input {
    height: 4.9rem;
    width: 100%;
    
    padding: 1.2rem 1.4rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: 0;
    background: transparent;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;