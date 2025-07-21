import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/postLogin.json')); // Importando o arquivo JSON com os dados de login

export function obterToken() {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify(postLogin); // Payload que será enviado no corpo da requisição

    // Configuração do cabeçalho da requisição
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Enviando a requisição POST
    const response = http.post(url, payload, params);
    return response.json('token'); // Retorna o token da resposta
};

