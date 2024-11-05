import { Container } from "./style";
import bg from "../../assets/bg.jfif";
function Home() {
  return (
    <Container>
      <div id="background">
        <img src={bg} alt="" />
      </div>
      <div id="welcome">
        <h1>Assembleia de Deus.</h1>
        <p id="versiculo">
          "Eu sou o bom pastor; conheço as minhas ovelhas, e elas me conhecem."
          <br />
          João 10:14.
        </p>
        <p>
          Acompanhe de perto cada fiel da Assembleia de Deus Cubatão e fortaleça
          a comunhão, utilizando esta plataforma para gerenciar as informações
          de nossa comunidade.
        </p>
        <button>Ver membros!</button>
      </div>
    </Container>
  );
}

export default Home;
