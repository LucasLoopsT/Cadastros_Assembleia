import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 20vh;
  background-color: ${({ theme }) => theme.COLORS.color_1};
  display: flex;
  justify-content: center;
  align-items: center;

  nav {
    width: 85%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 80px;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  li {
    color: ${({ theme }) => theme.COLORS.color_3};
    font-weight: 600;
    text-decoration: underline transparent;
    list-style: none;
  }

  li:hover {
    color: white;
    text-decoration: underline white;
  }
`;
