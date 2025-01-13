import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 130px;

  button {
    background-color: ${({ theme }) => theme.COLORS.color_4};
    color: white;
    width: 100%;
    height: 40px;
    padding: 10px;
    text-align: center;
    border: none;
    border-radius: 10px;
    transition: all 200ms ease;
  }
  button:hover {
    padding-left: 20px;
  }
  .active {
    background-color: ${({ theme }) => theme.COLORS.color_5};
  }
`;
