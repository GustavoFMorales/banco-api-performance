import http, { head } from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json')); // Importando o arquivo JSON com os dados de login
import { baseUrl } from '../utils/variaveis.js'; // Importando a função baseUrl

/*
Configurações do teste por interação
Aqui definimos quantas iterações serão feitas e os limites de performance
Por exemplo, podemos definir que 90% das requisições devem ser concluídas em
export const options = {
    iterations: 20, // Número de iterações de teste
    thresholds: {
        http_req_duration: ['p(90)<100', 'max<=10'], // Define um limite de 90% das requisições devem ser concluídas em menos de 100ms
        http_req_failed: ['rate<0.01'], // Define que a taxa de falhas deve ser menor que 1%
    }
}; */

/*
// Configuração utilizando usuários virtuais
export const options = {
    vus: 10, // Número de usuários virtuais
    duration: '30s', // Duração do teste
    thresholds: {
        http_req_duration: ['p(90)<300', 'max<=200'], // Define um limite de 90% das requisições devem ser concluídas em menos de 100ms
        http_req_failed: ['rate<0.01'], // Define que a taxa de falhas deve ser menor que 1%
    }

};
*/

// Usuários virtuais utilizando stages
// stage é uma forma de definir o número de usuários virtuais ao longo do tempo
export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Aumenta o número de usuários virtuais para 20 ao longo de 30 segundos
        { duration: '1m30s', target: 10 }, // Mantém 10 usuários virtuais por 1 minuto e 30 segundos
        { duration: '20s', target: 0 } // Reduz o número de usuários virtuais para 0 ao longo de 20 segundos
    ],
    http_req_duration: ['p(90)<300', 'max<=200'], // Define um limite de 90% das requisições devem ser concluídas em menos de 300ms
    http_req_failed: ['rate<0.01'], // Define que a taxa de falhas deve ser menor que 1%
};

export default () => {
    // Tudo que estiver aqui dentro será nosso teste

    const url = `${baseUrl()}/login`; // Usando a função baseUrl para obter a URL base
    const payload = JSON.stringify(postLogin); // Payload que será enviado no corpo da requisição

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