import { DiaryEntry } from "../types";

interface Props {
  diaryEntry: Array<DiaryEntry>;
}

const ListDiaryEntries = function ({ diaryEntry }: Props) {
  return (
    <ul>
      {diaryEntry.map((entry) => (
        <li key={entry.id}>
          <h3 className="Date">{entry.date}</h3>
          <br></br>
          visibility: {entry.visibility}
          <br></br>
          weather: {entry.weather}
          <br></br>
          {entry?.comment}
        </li>
      ))}
    </ul>
  );
};

export default ListDiaryEntries;
