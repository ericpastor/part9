export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type FormEntry = Omit<DiaryEntry, "id">;

export interface Notify {
  message: string | null;
}
