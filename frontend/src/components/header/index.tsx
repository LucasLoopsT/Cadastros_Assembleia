import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "./style.tsx";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext.tsx";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Container>
      <nav>
        <NavLink to="/" className="brand inactive" end>
          <img src={logo} alt="Assembleia" />
        </NavLink>
        <input type="checkbox" id="menu-faketrigger" aria-label="Abrir menu" />
        <label htmlFor="menu-faketrigger" id="menu" aria-hidden>
          <span />
          <span />
          <span />
        </label>
        <ul>
          <img src={logo} alt="Assembleia"/>
          <li>
            <NavLink to="/" end>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/members">Membros</NavLink>
          </li>
          <li>
            <NavLink to="/members/new">Novo</NavLink>
          </li>
          <li>
            <NavLink to="/admins">Administradores</NavLink>
          </li>
          <li>
            <button type="button" className="ghost" onClick={handleLogout}>
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  );
}

export default Header;
