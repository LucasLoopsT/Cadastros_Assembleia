import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme.tsx";
import GlobalStyle from "../styles/global.tsx";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Outlet />
    </ThemeProvider>
  );
}
