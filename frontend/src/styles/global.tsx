import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.canvas};
        color: ${({ theme }) => theme.COLORS.text};
        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea, select {
        font-family: ${({ theme }) => theme.FONT.sans};
        font-size: 15px;
        line-height: 1.5;
        outline: none;
    }

    h1, h2, h3, h4 {
        font-family: ${({ theme }) => theme.FONT.display};
        color: ${({ theme }) => theme.COLORS.text};
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: -0.02em;
    }

    h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
    h2 { font-size: clamp(1.35rem, 3vw, 1.75rem); }
    h3 { font-size: 1.125rem; }

    p, li {
        color: ${({ theme }) => theme.COLORS.textMuted};
    }

    label {
        font-size: 0.8125rem;
        font-weight: 600;
        color: ${({ theme }) => theme.COLORS.text};
    }

    button, a {
        cursor: pointer;
        text-decoration: none;
        transition: color 150ms ease, background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
    }

    a:focus-visible, button:focus-visible {
        outline: 2px solid ${({ theme }) => theme.COLORS.primary};
        outline-offset: 2px;
    }
`;
