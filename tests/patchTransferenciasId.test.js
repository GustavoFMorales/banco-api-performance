import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterTokenLogin } from '../helpers/autenticacao.js';
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
  stages: [
    {duration: '10s', target: 10},
    {duration: '10s', target: 0}
  ],

  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
 const token = obterTokenLogin();
 const url = `${pegarBaseUrl()}/transferencias/1896`;

 const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
 };

 const data = {
  "valor": 20,
 };

 const resposta = http.patch(url, JSON.stringify(data), {headers:headers})

 console.log(resposta.status);
 console.log(resposta.body)

 check(resposta, {
    "Validando que o status é 204": (r) => r.status === 204
 })
}
