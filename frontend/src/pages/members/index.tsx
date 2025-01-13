import { Container, MembersArea, Search } from "./style.tsx";
import { useState } from "react";
import MemberCard from "../../components/MemberCard/index.tsx";
import FilterBtn from "../../components/FilterBtn/index.tsx";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function Members() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState("Nome");
  const [message, setMessage] = useState("");

  const handleSearchMembers = () => {
    alert(message);
    alert(filter);
  };

  const handleFilter = (id: any) => {
    const btnsActiveteds = document.getElementsByClassName("active");
    Array.from(btnsActiveteds).forEach((btn) => {
      btn.classList.remove("active");
    });

    const btn = document.getElementById(id);
    btn?.classList.add("active");
    setFilter(id);
  };

  return (
    <Container>
      <Search>
        <HiMagnifyingGlassCircle
          id="lupa"
          onClick={() => handleSearchMembers()}
        />
        <input
          type="text"
          placeholder="Digite aqui."
          onChange={(e) => setMessage(e.target.value)}
          id="searchBox"
        />
        <p>Filtros:</p>
        <div className="filtros">
          <FilterBtn
            className="active"
            name={"Nome"}
            onClick={() => handleFilter("Nome")}
          />
          <FilterBtn
            name={"Sobrenome"}
            onClick={() => handleFilter("Sobrenome")}
          />
          <FilterBtn name={"Cargo"} onClick={() => handleFilter("Cargo")} />
          <FilterBtn name={"Cidade"} onClick={() => handleFilter("Cidade")} />
          <FilterBtn name={"Bairro"} onClick={() => handleFilter("Bairro")} />
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
