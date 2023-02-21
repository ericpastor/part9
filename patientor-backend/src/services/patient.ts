/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from "../data/patients";

import {
  NewPatientEntry,
  PublicPatient,
  PatientEntry,
  Patient,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const patientToShow: Array<Patient> = patientData as Array<Patient>;

const getPatient = (id: string): Patient | undefined => {
  let patientSelected = patientToShow.find((p) => p.id === id);
  if (patientSelected && !patientSelected?.entries)
    patientSelected = {
      ...patientSelected,
      entries: [],
    };

  return patientSelected;
};
const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientToShow.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export const addPatient = (newPatientEntry: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuidv4(),
    ...newPatientEntry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addPatient, getPatient };
