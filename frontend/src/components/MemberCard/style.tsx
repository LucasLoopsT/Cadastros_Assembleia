import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 230px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.bg_dark};
  border: 3px solid ${({ theme }) => theme.COLORS.bg_dark};
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    border: 3px solid ${({ theme }) => theme.COLORS.bg_darker};
  }

  div {
    background-color: ${({ theme }) => theme.COLORS.bg};
    width: 85%;
    height: 160px;
    margin: 10px 0;
    border-radius: 8px;
  }

  h3,
  p {
    color: ${({ theme }) => theme.COLORS.bg_darker};
    font-size: 15px;
  }
`;
