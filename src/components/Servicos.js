import axios from "axios";

function Entrar(conteudo) {
  const request = axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`,
    conteudo
  );
  return request;
}

function registro(conteudo) {
  const request = axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`,
    conteudo
  );
  return request;
}

function criarHabito(conteudo, ajuste) {
  const request = axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
    conteudo,
    ajuste
  );
  return request;
}

function listarHabito(ajuste) {
  const request = axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
    ajuste
  );
  return request;
}

function apagarHabito(id, ajuste) {
  const request = axios.delete(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
    ajuste
  );
  return request;
}

function habitoDiario(ajuste) {
  const request = axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,
    ajuste
  );
  return request;
}

function habitoConcluido(id, ajuste) {
  const request = axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
    {},
    ajuste
  );
  return request;
}

function habitoNaoRealizado(id, ajuste) {
  const request = axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
    {},
    ajuste
  );
  return request;
}

export {
  Entrar,
  registro,
  criarHabito,
  listarHabito,
  apagarHabito,
  habitoDiario,
  habitoConcluido,
  habitoNaoRealizado
};
