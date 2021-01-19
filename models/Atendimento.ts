import moment from "moment";
import { Connection } from "mysql";
import { Response } from "express";

export class Atendimento {
    private id?: Number;
    private cliente: String;
    private pet: String;
    private servico: String;
    private data: Date;
    private dataCriacao: Date;
    private status: String;
    private observacoes: String;

    constructor(atendimento: Atendimento) {
        this.cliente = atendimento.cliente;
        this.pet = atendimento.pet;
        this.servico = atendimento.servico;
        this.data = new Date(moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'));
        this.dataCriacao = new Date();
        this.status = atendimento.status;
        this.observacoes = atendimento.observacoes;
    }

    Adicionar(_conexao: Connection, res: Response) {
        const sql = 'INSERT INTO Atendimentos SET ?';
        if(moment(this.data).isSameOrAfter(this.dataCriacao))
            _conexao.query(sql, this, (error, resultado) => {
                if(error)
                    res.status(400).json(error);
                else
                    Atendimento.SelecionarId(_conexao, resultado.insertId, res);
            });
        else
            res.status(400).json({
                nome: 'Data',
                mensagem: 'A data deve ser igual ou maior que a data atual'
            });
    }

    static Selecionar(_conexao: Connection, res: Response) {
        const sql = 'Select * FROM Atendimentos';
        _conexao.query(sql, (error, resultado) => {
            if(error)
                res.status(400).json(error);
            else
                res.status(200).json(resultado);
        });
    }

    static SelecionarId(_conexao: Connection, id: Number, res: Response) {
        const sql = 'Select * FROM Atendimentos WHERE id=' + id;
        _conexao.query(sql, (error, resultado) => {
            if(error)
                res.status(404).json(error);
            else
                res.status(200).json(resultado);
        });
    }

    static Atualizar(_conexao: Connection, corpo: Atendimento, id: Number, res: Response) {
        if(corpo.data)
            corpo.data = new Date(moment(corpo.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'));
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';
        _conexao.query(sql, [corpo, id], (error, resultado) => {
            if(error)
                res.status(400).json(error);
            else
                Atendimento.SelecionarId(_conexao, id, res);
        });
    }

    static Deletar(_conexao: Connection, id: Number, res: Response) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        _conexao.query(sql, id, (error, resultado) => {
            if(error)
                res.status(400).json(error);
            else
                res.status(204).json({id});
        });
    }
}