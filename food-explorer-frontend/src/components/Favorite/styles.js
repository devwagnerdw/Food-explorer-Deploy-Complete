import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  padding: 1.7rem 0;

  > img {

    width: 7.2rem;
    height: fit-content;
  }

  > div {
    h2 {
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 2rem;
      line-height: 160%;
  
      color: ${({ theme }) => theme.COLORS.GRAY_200};
    }
  
    button {
      background: none;
      font-size: 1.2rem;
      line-height: 160%;
      color: ${({ theme }) => theme.COLORS.LIGHT_RED};
    }
  }

  @media (min-width: 1024px) {
    width: 23.5rem;
  }
`;