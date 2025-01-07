import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  height: 100vh;

  grid-template-areas: "aside section section";
  grid-template-columns: max-content;
`;

export const Search = styled.aside`
  grid-area: aside;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 200px;
  background-color: ${({ theme }) => theme.COLORS.bg_dark};
  padding-top: 30px;

  input {
    border-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.COLORS.bg};
    padding: 10px;
    width: 80%;
  }

  p {
    border-top: ${({ theme }) => theme.COLORS.bg} 2px solid;
    margin: 25px 0 15px;
    padding-top: 15px;
    width: 80%;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.color_1};
    font-weight: bold;
  }

  .filtros {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

export const MembersArea = styled.section`
  grid-area: section;
  width: 100%;
  padding-top: 30px;
`;
