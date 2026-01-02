import http from "k6/http";
import {sleep, check} from 'k6';
import {obterTokenLogin} from '../helpers/autenticacao.js';
const postTransferencias = JSON.parse(open('../fixtures/postTransferencias.json'));


export const options = {
    stages: [
        {duration: '30s', target: '10'},
        {duration: '30', target: '20'},
        {duration: '20s', target: '0'}
    ],
    thresholds: {
        http_req_duration: ['p(90)< 3000', 'max< 5000']
    }
};

export default function () {
    const token = obterTokenLogin(); // obtém o token de autenticação

    const url = 'http://localhost:3000/transferencias';
    const payload = JSON.stringify(postTransferencias);

    const params  = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const resposta = http.post(url, payload, params);
    check(resposta, {
        "Validando que o status é 201": (r) => r.status === 201
    })

    sleep(1);
};