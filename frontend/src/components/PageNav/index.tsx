import type { ReactNode } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { NavLink, NavRow } from "./style.tsx";

type PageNavProps = {
  to: string;
  label: string;
};

export function PageNav({ to, label }: PageNavProps) {
  return (
    <NavLink to={to}>
      <HiArrowLeft aria-hidden />
      {label}
    </NavLink>
  );
}

export function PageNavBar({ children }: { children: ReactNode }) {
  return <NavRow>{children}</NavRow>;
}
