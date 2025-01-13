import { Container, MembersArea, Search } from "./style.tsx";
import { useState, useEffect } from "react";
import { findAll } from "../../services/membersServices.tsx";

import MemberCard from "../../components/MemberCard/index.tsx";
import FilterBtn from "../../components/FilterBtn/index.tsx";

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function Members() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState("Nome");
  const [message, setMessage] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODU1OTQ0YzlhNDQ5NzM1YzA0YzdjNCIsImlhdCI6MTczNjc5MjQxNywiZXhwIjoxNzM2ODc4ODE3fQ.RRlx9cNb9mBne5NzqTv8SuT1kcxUTw9vYvKeL7Y1QFA";

  const handleFindAllMembers = async () => {
    try {
      const response = await findAll(token);
      setMembers(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Erro ao buscar membros.");
      console.log(error);
    }
  };

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

  // handleFindAllMembers();

  useEffect(() => {
    handleFindAllMembers();
  }, [members]);

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
        <h2>Membros: {members.length}</h2>
        <div id="allCards">
          {members.length > 0 ? (
            members.map((member) => (
              <MemberCard
                name={member.nome}
                cargo={member.cargo}
                picture={member.foto}
              />
            ))
          ) : (
            <p>Nenhum membro encontrado.</p>
          )}
        </div>
      </MembersArea>
    </Container>
  );
}

export default Members;
