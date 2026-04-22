import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  min-height: max-content;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.COLORS.headerBg};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  nav {
    width: min(100%, ${({ theme }) => theme.LAYOUT.maxWidth});
    padding: 0 ${({ theme }) => theme.SPACE.lg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.SPACE.lg};
    position: relative;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.SPACE.md};
    color: ${({ theme }) => theme.COLORS.headerText};
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  nav img {
    width: 40px;
    height: 40px;
    transform: scale(3);
    margin: 10px 0;
  }

  #menu {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 40px;
    height: 40px;
    z-index: 10;
    cursor: pointer;
  }

  #menu-faketrigger {
    display: none;
  }

  #menu span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.COLORS.headerText};
    border-radius: 2px;
    transition: transform 200ms ease, opacity 200ms ease;
  }

  #menu-faketrigger:checked ~ #menu span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  #menu-faketrigger:checked ~ #menu span:nth-child(2) {
    opacity: 0;
  }

  #menu-faketrigger:checked ~ #menu span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }

  ul {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.SPACE.sm};
    list-style: none;
  }

  ul img{
    display: none;
  }

  a {
    color: rgba(248, 250, 252, 0.82);
    font-weight: 600;
    font-size: 0.9375rem;
    padding: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.md};
    border-radius: ${({ theme }) => theme.RADIUS.md};
    text-decoration: none;
  }

  a:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }

  a.active {
    color: #fff;
    background: rgba(37, 99, 235, 0.35);
  }

  a.inactive {
    background: transparent;
  }

  .ghost {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: ${({ theme }) => theme.COLORS.headerText};
    font-weight: 600;
    font-size: 0.9375rem;
    padding: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.md};
    border-radius: ${({ theme }) => theme.RADIUS.md};
  }

  .ghost:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  @media screen and (max-width: 720px) {
    #menu,
    #menu-faketrigger {
      z-index: 12;
      display: flex;
    }

    #menu-faketrigger {
      position: absolute;
      right: ${({ theme }) => theme.SPACE.lg};
      width: 40px;
      height: 40px;
      opacity: 0;
      z-index: 13;
      cursor: pointer;
    }

    ul {
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      position: fixed;
      inset: 0 0 auto auto;
      width: min(280px, 88vw);
      margin: 0;
      padding: calc(${({ theme }) => theme.LAYOUT.headerHeight}) + 1rem
        ${({ theme }) => theme.SPACE.lg} ${({ theme }) => theme.SPACE.lg};
      background: ${({ theme }) => theme.COLORS.headerBg};
      box-shadow: ${({ theme }) => theme.SHADOW.lg};
      border-radius: 0 0 0 ${({ theme }) => theme.RADIUS.lg};
      width: 100%;
      height: 100vh;
      z-index: 10;
    }

    ul img{
     display: block;
    }

    #menu-faketrigger:checked ~ ul {
      display: flex;
    }
  }
`;
