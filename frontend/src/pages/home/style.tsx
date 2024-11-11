import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 110vh;
    object-fit: cover;
    object-position: top;
  }

  #background::before {
    content: "";
    position: absolute;
    background-color: #010617aa;
    width: 100%;
    height: 110vh;
  }

  #welcome {
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 100px;
  }

  h1 {
    font-family: "Volkhov", serif;
    color: white;
    font-weight: 700;
    text-align: center;
    margin-bottom: 35px;
    text-transform: unset;
  }

  P {
    font-family: "Roboto Slab", serif;
    color: ${({ theme }) => theme.COLORS.color_3};
    text-align: center;
    text-shadow: #00000070 0.1em 0.1em 0.2em;
    font-weight: 500;
  }

  #versiculo {
    color: ${({ theme }) => theme.COLORS.color_3};
    font-weight: 300;
    font-style: italic;
    margin-bottom: 25px;
  }

  button {
    padding: 10px 20px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.COLORS.color_1};
    border: 2px solid transparent;
    box-shadow: 0px 10px 60px black;

    color: ${({ theme }) => theme.COLORS.color_3};
    font-weight: 500;
    text-transform: uppercase;
    margin-top: 70px;

    transition-duration: 700ms;
  }

  button:hover {
    color: white;
    background-color: ${({ theme }) => theme.COLORS.color_2};
    border-color: ${({ theme }) => theme.COLORS.color_3};
    box-shadow: 0px 5px 100px 0px white;
  }
`;
