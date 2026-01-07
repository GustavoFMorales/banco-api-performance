import http from 'k6/http';
import { sleep, check } from 'k6';
import {obterTokenLogin} from '../helpers/autenticacao.js';
import {pegarBaseUrl} from '../utils/variaveis.js';

export const options = {
 vus: 1,
 thresholds: {
  http_req_duration: ['p(95)<3000'],
  http_req_failed: ['rate<0.01']
 }
};

export default function() {
  const token = obterTokenLogin();
  const url = `${pegarBaseUrl()}/transferencias/1893`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const resposta = http.del(url, null, {headers:headers});
  console.log(`Status da requisição: ${resposta.status}`);
  console.log(`Body da requisição: ${resposta.body}`);

  check(resposta, {
    "Validando que o status é 204": (r) => r.status === 204
  })
}
