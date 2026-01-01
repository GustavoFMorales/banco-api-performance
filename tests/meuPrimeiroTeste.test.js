import http from 'k6/http'; // importando módulo http do k6
import {sleep} from 'k6'; // importando o módulo sleep do k6, que serve para pausar a execução

export const options = {
    iterations: 10, // quantidade de iterações a serem realizadas
};
export default function () {
    http.get('https://www.ideia2001.com.br');
    sleep(1);
};