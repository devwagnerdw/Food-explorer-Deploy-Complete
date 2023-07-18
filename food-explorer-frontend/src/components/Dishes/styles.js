import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ theme, isNew }) =>
    isNew ? "transparent" : theme.COLORS.GRAY_400};
  outline: ${({ theme, isNew }) =>
    isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : "none"};
  
  border-radius: 0.9rem;
  padding-right: 1.7rem;
  
  > button {
    background: none;
    align-items: center;
    border: none;
    display: flex;
    
    color: ${({ theme, isNew }) =>
    isNew ? theme.COLORS.GRAY_300 : theme.COLORS.WHITE};
  }
  
  > input {
    height: 3.2rem;
    width: 100%;
    
    border: none;
    padding: 0.8rem 0.8rem 0.8rem 1.6rem;
    outline: none;
    
    background: transparent;
    color: ${({ theme }) => theme.COLORS.WHITE};

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
    }
  }
`;