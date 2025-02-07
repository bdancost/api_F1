import express from "express";
import { drivers } from "../data.js";
import { randomUUID } from "node:crypto";
import {
  validateDriverInfo,
  validateUpdateDriverInfo,
  validatePosition,
} from "../inputValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(drivers);
});

router.get("/standings/:position", (req, res) => {
  const { position } = req.params;
  const { error } = validatePosition(position, drivers.length);

  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }

  const selectedDriver = drivers[position - 1];
  res.status(200).send(selectedDriver);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  if (!selectedDriver) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }

  res.status(200).send(selectedDriver);
});

router.post("/", (req, res, next) => {
  const { error } = validateDriverInfo(req.body);
  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }
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

router.put("/:id", (req, res, next) => {
  const { error } = validateUpdateDriverInfo(req.body);
  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }

  const { id } = req.params;
  const selectedDriver = drivers.find((d) => d.id === id);
  if (!selectedDriver) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }

  for (const key in selectedDriver) {
    if (req.body[key]) {
      selectedDriver[key] = req.body[key];
    }
  }

  res.status(200).send(selectedDriver);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((d) => d.id === id);

  if (!selectedDriver) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }

  const index = drivers.indexOf(selectedDriver);
  drivers.splice(index, 1);

  res.status(200).send(selectedDriver);
});

export default router;
