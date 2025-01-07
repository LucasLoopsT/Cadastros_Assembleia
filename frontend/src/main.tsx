import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/home/index.tsx";
import Members from "./pages/members/index.tsx";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: "",
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/members",
          element: <Members />,
        },
      ],
    },
  ],
  { basename: "/" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
