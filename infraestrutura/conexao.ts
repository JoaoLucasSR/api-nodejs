import { createConnection } from "mysql";

export const conexao = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'agenda_petshop',
    password: 'senha',
    database: 'agenda-petshop'
});