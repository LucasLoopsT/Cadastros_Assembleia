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

  #lupa {
    font-size: 60px;
    margin-bottom: 5px;
    cursor: pointer;
  }

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 15px;

  h2 {
    background-color: ${({ theme }) => theme.COLORS.bg_dark};
    padding: 25px;
    border-radius: 15px;
    width: 95%;
    border-bottom: ${({ theme }) => theme.COLORS.color_1} 30px solid;
  }

  #allCards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 85%;
    margin-top: 20px;
    gap: 20px;
  }
`;
