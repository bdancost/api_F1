import express from "express";
import driversRouter from "./routes/driver.js";
import teamsRouter from "./routes/team.js";

const baseAPIRoute = "/api/v1";

const app = express();

// Middleware
app.use(express.json());
app.use(baseAPIRoute + "/drivers", driversRouter);
app.use(baseAPIRoute + "/teams", teamsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`);
});
