import { NewPatientEntry } from "./types";
import { Gender } from "./enum";

const parseSsn = (ssnFromRequest: unknown): string => {
    if (!ssnFromRequest || !isString(ssnFromRequest)) {
        throw new Error('Incorrect or missing ssn: ' + ssnFromRequest);
    }
    return ssnFromRequest;    
};

const parseName = (nameFromRequest: unknown): string => {
    if(!nameFromRequest || !isString(nameFromRequest)){
        throw new Error('Incorrect or missing name: ' + nameFromRequest);
    }
    return nameFromRequest;
};

const parseOccupation = (occupationFromRequest: unknown): string => {
    if(!occupationFromRequest || !isString(occupationFromRequest)){
        throw new Error('Incorrect or missing occupation: ' + occupationFromRequest );
    }
    return occupationFromRequest;
};

const parseDateOfBirth = (dateOfBirthFromRequest: unknown): string => {
    if(!isString(dateOfBirthFromRequest) || !isDate(dateOfBirthFromRequest)){
        throw new Error('Incorrect or missing date:' + dateOfBirthFromRequest);
    }

    return dateOfBirthFromRequest;
};  

const parseGender = (genderFromRequest: unknown): Gender => {
    if(!genderFromRequest || !isString(genderFromRequest) || !isGender(genderFromRequest)){
        throw new Error('Incorrect or missing gender: ' + genderFromRequest);
    }
    return genderFromRequest;
}; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender), 
        occupation: parseOccupation(object.occupation)
    };

    return newEntry;
};



export default toNewPatientEntry;