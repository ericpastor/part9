import axios, { AxiosError } from "axios";

import { DiaryEntry, FormEntry } from "./types";

const baseUrl = `http://localhost:3000/api/diaries`;

export const getAllEntries = async () => {
  try {
    return await axios
      .get<DiaryEntry[]>(baseUrl)
      .then((response) => response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      console.log(AxiosError);
      throw error.message;
    } else {
      console.error(error);
    }
  }
};

export const createEntry = (object: FormEntry) => {
  try {
    return axios
      .post<DiaryEntry>(baseUrl, object)
      .then((response) => response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
