import diagnoseData from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries,
};
