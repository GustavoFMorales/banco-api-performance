import http from "k6/http";
import { check, sleep } from "k6";
import { obterTokenLogin } from "../helpers/autenticacao.js";
import { pegarBaseUrl } from "../utils/variaveis.js";
export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<3000"], // 95% das requisições devem ser respondidas em menos de 3s
    http_req_failed: ["rate<0.01"], // Menos de 1% das requisições podem falhar
  },
};

export default function () {
  const token = obterTokenLogin();
 const res = http.get(`${pegarBaseUrl()}/transferencias`, {
    headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
    }
  })

  check(res, {
    "Validar que o status é 200": (r) => r.status === 200
  });
  
  sleep(1);
}
