import { json } from "body-parser";
import { Console } from "console";
import { Express } from "express";
import { ppid } from "process";

module.exports = (app: Express) => {
    app.get('/atendimentos', (req, res) => {
        res.send("<h1>Hello Express TS</h1>");
    });

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.status(201);
        res.send(JSON.stringify(req.body));
    });
}