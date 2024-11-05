import { Container } from "./style.tsx";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <Container>
      <nav>
        <img src={logo} alt="pomba da paz" />
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
