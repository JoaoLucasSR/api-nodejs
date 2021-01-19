import { Express } from "express";
import { conexao } from "../infraestrutura/conexao";
import { Atendimento } from "../models/Atendimento";

module.exports = (app: Express) => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.Selecionar(conexao, res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.SelecionarId(conexao, id, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const bodyId = parseInt(req.body.id);
        if(bodyId != id)
            res.status(400).send();
        else
            Atendimento.Atualizar(conexao, req.body, id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = new Atendimento(req.body);
        const resp = atendimento.Adicionar(conexao, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.Deletar(conexao, id, res);
    });
}