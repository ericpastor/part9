/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import patient from "../services/patient";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patient.getEntries());
});

router.get("/:id", (req, res) => {
  const patientSelected = patient.getPatient(req.params.id);
  if (patientSelected) {
    res.send(patientSelected);
  } else {
    const errorMessage = "Patient not found";
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatientEntry = patient.addPatient(newPatientEntry);

    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
