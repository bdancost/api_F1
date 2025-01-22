import express from "express";
import { drivers } from "./data.js";

const baseAPIRoute = "/api/v1";

const app = express();

app.get(baseAPIRoute + "/drivers", (req, res) => {
  res.status(200).send(drivers);
});

const port = 3000;
app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`);
});
