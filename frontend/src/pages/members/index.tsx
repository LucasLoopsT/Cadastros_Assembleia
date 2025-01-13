import { Container, MembersArea, Search } from "./style.tsx";
import MemberCard from "../../components/MemberCard/index.tsx";
import FillterBtn from "../../components/FiltterBtn/index.tsx";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function Members() {
  const handleFilter = (id: string) => {
    const btnsActiveteds = document.getElementsByClassName("active");
    Array.from(btnsActiveteds).forEach((btn) => {
      btn.classList.remove("active");
    });

    const btn = document.getElementById(id);
    btn?.classList.add("active");
  };

  return (
    <Container>
      <Search>
        <HiMagnifyingGlassCircle id="lupa" />
        <input type="text" placeholder="Digite aqui." />
        <p>Filtros:</p>
        <div className="filtros">
          <FillterBtn name={"Nome"} onClick={() => handleFilter("Nome")} />
          <FillterBtn
            name={"Sobrenome"}
            onClick={() => handleFilter("Sobrenome")}
          />
          <FillterBtn name={"Cargo"} onClick={() => handleFilter("Cargo")} />
          <FillterBtn name={"Cidade"} onClick={() => handleFilter("Cidade")} />
          <FillterBtn name={"Bairro"} onClick={() => handleFilter("Bairro")} />
        </div>
      </Search>
      <MembersArea>
        <h2>Membros:</h2>
        <div id="allCards">
          <MemberCard name={"Lucas Lopes"} cargo={"Membro"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
          <MemberCard name={"Oziel Silva"} cargo={"Pastor"} picture="foto" />
        </div>
      </MembersArea>
    </Container>
  );
}

export default Members;
