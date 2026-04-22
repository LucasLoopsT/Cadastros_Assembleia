import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import PrivateLayout from "./layouts/PrivateLayout.tsx";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import Members from "./pages/members/index.tsx";
import MemberDetail from "./pages/members/MemberDetail.tsx";
import MemberForm from "./pages/members/MemberForm.tsx";
import AdminsPage from "./pages/admins/index.tsx";
import AdminForm from "./pages/admins/AdminForm.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <Login /> },
      {
        element: <PrivateLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "members", element: <Members /> },
          { path: "members/new", element: <MemberForm /> },
          { path: "members/:id/edit", element: <MemberForm /> },
          { path: "members/:id", element: <MemberDetail /> },
          { path: "admins", element: <AdminsPage /> },
          { path: "admins/new", element: <AdminForm /> },
          { path: "admins/:id/edit", element: <AdminForm /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
