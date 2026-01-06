import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterTokenLogin } from '../helpers/autenticacao.js';
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000', 'max<5000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
  const token = obterTokenLogin();
  const url = `${pegarBaseUrl()}/transferencias/1895`;

  const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
  }

  const data = {
    "contaOrigem": 3,
    "contaDestino": 2,
    "valor": 15,
    "token": ""
  }
  
const resposta = http.put(url, JSON.stringify(data), { headers: headers });

  console.log('Status:', resposta.status);
  console.log('Body:', resposta.body);

  check(resposta, {
    "Validando que o status é 204": (r) => r.status === 204,

  });
  sleep(1);

}
