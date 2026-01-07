import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterTokenLogin } from '../helpers/autenticacao.js';
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  const token = obterTokenLogin();

  const resposta = http.get(`${pegarBaseUrl()}/contas/3`, {
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
