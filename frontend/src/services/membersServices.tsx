import axios from "axios";
const baseURL = "localhost:3000";

export function create(
  token: string,
  nome: string,
  sobrenome: string,
  foto: string,
  dataNasc: string,
  telefone: string,
  cidade: string,
  bairro: string,
  rua: string,
  numEndereco: 0,
  congregacao: string,
  cargo: string
) {
  const response = axios.post(
    `${baseURL}/project/`,
    {
      nome,
      sobrenome,
      foto,
      dataNasc,
      telefone,
      cidade,
      bairro,
      rua,
      numEndereco,
      congregacao,
      cargo,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export function findAll(token: string) {
  const response = axios.get(`${baseURL}/project`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export function findById(token: string, id: string) {
  const response = axios.get(`${baseURL}/project/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export function update(
  token: string,
  id: string,
  nome: string,
  sobrenome: string,
  foto: string,
  dataNasc: string,
  telefone: string,
  cidade: string,
  bairro: string,
  rua: string,
  numEndereco: 0,
  congregacao: string,
  cargo: string
) {
  const response = axios.patch(
    `${baseURL}/project/${id}`,
    {
      nome,
      sobrenome,
      foto,
      dataNasc,
      telefone,
      cidade,
      bairro,
      rua,
      numEndereco,
      congregacao,
      cargo,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export function deleteProject(token: string, id: string) {
  const response = axios.delete(`${baseURL}/project/delete/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
}
