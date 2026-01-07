import http from 'k6/http';
import { sleep, check } from 'k6';
import {obterTokenLogin} from '../helpers/autenticacao.js';
import {pegarBaseUrl} from '../utils/variaveis.js';

export const options = {
 stages: [
   {duration: '10s', target:20},
   {duration: '10s', target:10},
   {duration: '10s', target:0}
 ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
  const token = obterTokenLogin();

  const resposta = http.get(`${pegarBaseUrl()}/transferencias`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })



  check (resposta, {
    "Validando que o status é 200": (r) => r.status === 200
  })

  sleep(1);
}
