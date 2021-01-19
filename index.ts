import express from "express";
import bodyParser from "body-parser";
const consign = require('consign');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign({extensions: [ '.js', '.json', '.node', '.ts' ]})
    .include('controllers')
    .into(app);

app.listen(3000, () => "Server running in port: 3000");
