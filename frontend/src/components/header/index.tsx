import { Container } from "./style.tsx";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <Container>
      <nav>
        <img src={logo} alt="pomba da paz" />
        <input type="checkbox" id="menu-faketrigger" />
        <div id="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <li>Membros</li>
          <li>Administrador</li>
          <li>Sair</li>
        </ul>
      </nav>
    </Container>
  );
}

export default Header;
