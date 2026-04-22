import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/index.tsx";
import Footer from "../components/footer/index.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

const Main = styled.main`
  min-height: calc(100vh - ${({ theme }) => theme.LAYOUT.headerHeight});
  padding: ${({ theme }) => theme.SPACE["2xl"]} ${({ theme }) => theme.SPACE.lg};
`;

export default function PrivateLayout() {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
