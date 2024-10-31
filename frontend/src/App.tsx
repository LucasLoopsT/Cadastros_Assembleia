import { Outlet } from "react-router-dom";

// Styled-components
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.tsx";
import GlobalStyle from "./styles/global.tsx";

//Components
import Header from "./components/header/index.tsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
