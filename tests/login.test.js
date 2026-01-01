import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  // iterations: 40, // 10 usuários virtuais simultâneos
  // vus: 10, // quantidade de usuários virtuais simultâneos
  //duration: '30s', // Duração do teste
  stages: [
    { duration: "30s", target: 10 },
    { duration: "30s", target: 20 },
    { duration: "30s", target: 30 },
    { duration: "30s", target: 40 },
    { duration: "30s", target: 50 }, // Diminui para 0 usuários em 5 segundos
  ],
  thresholds: {
    // Tresholds são critérios de sucesso ou falha do teste
    http_req_duration: ["p(90)<3000", "max<5000"], // 95% das requisições devem ser respondidas em menos de 7ms
    http_req_failed: ["rate<0.01"], // Menos de 1% das requisições podem falhar
  },
};

export default function () {
  // Aqui será realizado os testes de login
  const url = "http://localhost:3000/login"; // url do endpoint de login
  const payload = JSON.stringify({
    username: "gustavo",
    senha: "123456",
  });

  // payload e params são enviados na requisição POST

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resposta = http.post(url, payload, params);

  check(resposta, {
    "Validar que o status é 200": (r) => r.status === 200,
    "Validar se o token é string": (r) => typeof r.json().token === "string", // r.json() converte  a resposta para json
  });

  sleep(1); // Pausa de 1 segundo entre as iterações
}
