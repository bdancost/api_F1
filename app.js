import express from "express";
import { drivers } from "./data.js";
import { randomUUID } from "node:crypto";

const baseAPIRoute = "/api/v1";

const app = express();

// Middleware
app.use(express.json());

app.get(baseAPIRoute + "/drivers", (req, res) => {
  res.status(200).send(drivers);
});

app.get(baseAPIRoute + "drivers/standings/:position", (req, res) => {
  const { position } = req.params;
  const selectedDriver = drivers[position - 1];
  res.status(200).send(selectedDriver);
});

app.get(baseAPIRoute + "/driver/:id", (req, res) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  res.status(200).send(selectedDriver);
});

app.post(baseAPIRoute + "/drivers", (req, res) => {
  const newDriver = { ...req.body, id: randomUUID() };
  drivers.push(newDriver);
  drivers.sort((b, a) => {
    if (a.points > b.points) {
      return 1;
    }
    if (b.points > a.points) {
      return -1;
    }
    return 0;
  });
  res.status(200).send(newDriver);
});

const port = 3000;
app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`);
});
