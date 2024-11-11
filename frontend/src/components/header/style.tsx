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
    align-items: center;
  }

  img {
    width: 50px;
    transform: scale(3);
  }

  #menu {
    display: none;
    position: absolute;
    width: 35px;
    height: 35px;
    z-index: 10;
  }

  #menu-faketrigger {
    display: none;
    position: absolute;
    width: 35px;
    height: 35px;
    cursor: pointer;
    opacity: 0;
    z-index: 11;
  }

  #menu span {
    display: block;
    width: 35px;
    height: 5px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 3px;
    transition: all 200ms ease;
  }

  #menu-faketrigger:hover ~ #menu span {
    background-color: ${({ theme }) => theme.COLORS.color_2};
  }

  #menu-faketrigger:checked ~ #menu span:nth-child(1) {
    transform-origin: 0% 0%;
    transform: rotate(45deg) scaleX(1.25);
  }

  #menu-faketrigger:checked ~ #menu span:nth-child(2) {
    opacity: 0;
  }

  #menu-faketrigger:checked ~ #menu span:nth-child(3) {
    transform-origin: 0% 100%;
    transform: rotate(-45deg) scaleX(1.25);
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

  @media screen and (max-width: 620px) {
    #menu,
    #menu-faketrigger {
      display: block;
      right: 15%;
    }

    ul {
      display: none;
    }

    #menu-faketrigger:checked ~ ul {
      display: flex;
      position: absolute;
      width: 80%;
      height: 100vh;
      right: 0;
      top: 0;
      z-index: 9;
      background: ${({ theme }) => theme.COLORS.color_3};
      flex-direction: column;
      padding: 20vh 0 0;
      animation: openUl 500ms forwards;

      li {
        color: ${({ theme }) => theme.COLORS.color_1};
      }

      li:hover {
        color: white;
      }
    }
  }

  @keyframes openUl {
    0% {
      opacity: 0;
      transform: translateX(20%);
    }
    100% {
    }
  }
`;
