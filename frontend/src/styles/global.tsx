import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body{
        background-color: ${({ theme }) => theme.COLORS.bg};
        color: ${({ theme }) => theme.COLORS.color_1};
        -webkit-font-smoothing: antileased;
    }

    body, input, button, textarea{
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        outline: none;
    }

    h1, h2, h3 {
        font-size: 50px;
        font-family: "Montserrat", sans-serif;
        text-transform: uppercase;
    }
    
    h2 {
        font-size: 45px;
    }

    h3 {
        font-size: 40px;
    }
    
    p, label {
        font-family: lato, sans-serif;
        text-align: left;
        font-size: 20px;
        color: ${({ theme }) => theme.COLORS.color_2}; 
    }

    label{
        color: ${({ theme }) => theme.COLORS.color_1}; 
    }

    button, a, li{
        cursor: pointer;
        text-decoration: none;
        transition: all 200ms ease;
    }
`;
