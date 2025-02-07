import express from "express";
import { generateTeamsArray } from "../data.js";
import { validatePosition } from "../inputValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(generateTeamsArray());
});

router.get("/standings/:position", (req, res, next) => {
  const teams = generateTeamsArray();
  const { position } = req.params;
  const { error } = validatePosition(position, teams.length);

  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }
  const selectedTeam = teams[position - 1];
  res.status(200).send(selectedTeam);
});

export default router;
