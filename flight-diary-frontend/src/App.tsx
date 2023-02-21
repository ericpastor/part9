import { useEffect, useState } from "react";
import "./App.css";

import ListDiaryEntries from "./components/ListDiaryEntries";
import { createEntry, getAllEntries } from "./diaryEntryService";
import ErrorHandling from "./notification";
import { DiaryEntry } from "./types";

const Title = (props: TitleProps) => <h1>{props.name} Diary</h1>;

interface TitleProps {
  name: string;
}

function App() {
  const [info, setInfo] = useState({ message: "" });
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry[]>([]);
  const [newDiaryEntry, setNewDiaryEntry] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const notifyWith = (message: string) => {
    setInfo({
      message,
    });

    setTimeout(() => {
      setInfo({ message: "" });
    }, 3000);
  };

  useEffect(() => {
    getAllEntries()
      .then((data) => {
        if (data) setDiaryEntry(data);
      })
      .catch((error) => {
        notifyWith(`Error: ${error}`);
      });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createEntry(newDiaryEntry)
      ?.then((data) => {
        setDiaryEntry([...diaryEntry, data]);
      })
      .catch((error) => {
        notifyWith(`${error.response.data} `);
        console.log(error);
      });
    setNewDiaryEntry({
      date: "",
      weather: "",
      visibility: "",
      comment: "",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  return (
    <div className="App">
      <Title name="Aviation" />
      <ErrorHandling info={info} />
      <form onSubmit={diaryCreation}>
        <label>
          Date:
          <input
            onChange={handleChange}
            type="date"
            name="date"
            value={newDiaryEntry.date}
          />
        </label>
        <fieldset>
          <legend>Visibility:</legend>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="great"
              name="visibility"
              value="great"
            />

            <label>great</label>
          </div>

          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="poor"
              name="visibility"
              value="poor"
            />
            <label>poor</label>
          </div>

          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="good"
              name="visibility"
              value="good"
            />
            <label>good</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="ok"
              name="visibility"
              value="ok"
            />
            <label>ok</label>
          </div>
        </fieldset>
        {/* Visibility:
        <input
          onChange={handleChange}
          value={newDiaryEntry.visibility}
          type="text"
          name="visibility"
          placeholder="visibility"
        /> */}
        <fieldset>
          <legend>Weather:</legend>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
            />

            <label>sunny</label>
          </div>

          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
            />
            <label>rainy</label>
          </div>

          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="good"
              name="weather"
              value="good"
            />
            <label>good</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
            />
            <label>cloudy</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
            />
            <label>stormy</label>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              id="windy"
              name="weather"
              value="windy"
            />
            <label>windy</label>
          </div>
        </fieldset>
        {/* Weather:
        <input
          onChange={handleChange}
          value={newDiaryEntry.weather}
          type="text"
          name="weather"
          placeholder="weather"
        /> */}
        comment:
        <textarea
          onChange={handleChange}
          value={newDiaryEntry?.comment}
          name="comment"
          placeholder="comment"
        />
        <button type="submit">add</button>
      </form>

      <ListDiaryEntries diaryEntry={diaryEntry} />
    </div>
  );
}

export default App;
