import express from "express";
import bodyParser from "body-parser";
const consign = require('consign');

import { conexao } from "./infraestrutura/conexao";
import Tabelas from "./infraestrutura/tabelas";

conexao.connect((error) => {
    if(error)
        console.log(error);
    else {
        console.log("Database connected");
        const tabelas = new Tabelas(conexao);
        const app = express();
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        consign({extensions: [ '.js', '.json', '.node', '.ts' ]})
            .include('controllers')
            .into(app);

        app.listen(3000, () => console.log("Server running in port: 3000"));
    }
});


