import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import Icon from "@mdi/react";
// https://pictogrammers.com/library/mdi/
import { mdiGenderMale, mdiGenderFemale, mdiHumanNonBinary } from "@mdi/js";

interface Props {
  patients: Patient[];
  diagnosisCodes: Diagnosis[];
}

const PatientPage = ({ patients, diagnosisCodes }: Props) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

  const codeRefence = patient?.entries.find((c) => c.diagnosisCodes);

  const refs = codeRefence?.diagnosisCodes;

  const diagnosesToShow = diagnosisCodes.filter((item) =>
    refs?.some((refs) => refs === item.code)
  );

  const iconGender = () => {
    switch (patient?.gender) {
      case "male":
        return <Icon path={mdiGenderMale} size={2} />;
      case "female":
        return <Icon path={mdiGenderFemale} size={2} />;
      case "other":
        return <Icon path={mdiHumanNonBinary} size={2} />;
    }
  };

  return (
    <div>
      <h2>
        {patient?.name}
        {iconGender()}
      </h2>
      <p>Ssn: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <br></br>
      <strong>entries:</strong>
      <ul>
        {patient?.entries
          ? patient?.entries.map((ent) => (
              <p key={ent.id}>
                {ent.date} {ent.description}
              </p>
            ))
          : "No entries documented"}
      </ul>
      <ul>
        {diagnosesToShow
          ? diagnosesToShow.map((d) => (
              <li key={d.code}>
                {d.code} {d.name}
              </li>
            ))
          : "No diagnoses documented"}
      </ul>
    </div>
  );
};

export default PatientPage;
