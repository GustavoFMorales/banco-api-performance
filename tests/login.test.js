import http, { head } from 'k6/http';
import { sleep, check } from 'k6';

/*
// Configurações do teste por interação
// Aqui definimos quantas iterações serão feitas e os limites de performance
// Por exemplo, podemos definir que 90% das requisições devem ser concluídas em
export const options = {
    iterations: 20, // Número de iterações de teste
    thresholds: {
        http_req_duration: ['p(90)<100', 'max<=10'], // Define um limite de 90% das requisições devem ser concluídas em menos de 100ms
        http_req_failed: ['rate<0.01'], // Define que a taxa de falhas deve ser menor que 1%
    }
}; */

// Configuração utilizando usuários virtuais
export const options = {
    vus: 10, // Número de usuários virtuais
    duration: '30s', // Duração do teste
    thresholds: {
        http_req_duration: ['p(90)<300', 'max<=200'], // Define um limite de 90% das requisições devem ser concluídas em menos de 100ms
        http_req_failed: ['rate<0.01'], // Define que a taxa de falhas deve ser menor que 1%
    }

};

export default () => {
    // Tudo que estiver aqui dentro será nosso teste

    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify({
        username: 'Gustavo',
        senha: '123456'
    }); // Payload que será enviado no corpo da requisição

    // Configuração do cabeçalho da requisição
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Enviando a requisição POST
    const response = http.post(url, payload, params);
    console.log(`Status: ${response.status}`); // Exibindo a resposta no console
    console.log(`Token: ${response.json().token}`); // Exibindo o token retornado no console

    check(response, {

        'Validar status 200': (r) => r.status === 200, // Verifica se o status da resposta é 200
        'Validar se o token é string': (r) => typeof r.json().token === 'string', // Verifica se o token retornado é uma string
    });

    sleep(1); // Pausa de 1 segundo entre as iterações



}