import http, { post } from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js'; // Importando a função para obter o token
const postTransferencia = JSON.parse(open('../fixtures/postTransferencia.json')); // Importando o arquivo JSON com os dados da transferência
import { baseUrl } from '../utils/variaveis.js'; // Importando a função baseUrl

export const options = {
  iterations: 1, // Número de iterações de teste
};

export default function () {
  const token = obterToken(); // Obtendo o token de autenticação
  const url = `${baseUrl()}/transferencias`; // Usando a função baseUrl para obter a URL base
  const payload = JSON.stringify(postTransferencia); // Payload que será enviado no corpo da requisição
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`// Adicionando o token no cabeçalho
    }
  };
  const response = http.post(url, payload, params); // Enviando a requisição POST
  check(response, {
    "Status é 201": (r) => r.status === 201, // Verificando se o status da resposta é 201
  })
  sleep(1);
}
