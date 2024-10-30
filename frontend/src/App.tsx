import { Outlet } from "react-router-dom";

// Styled-components
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.tsx";
import GlobalStyle from "./styles/global.tsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
