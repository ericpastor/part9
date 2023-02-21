import React from 'react';
import './App.css';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Description extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends Description {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends Description {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends Description {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div className="base">
          <i>{part.description}</i>
        </div>
      );

    case 'groupProject':
      return (
        <div className="base">
          <i>Progect exercises: {part.groupProjectCount}</i>
        </div>
      );

    case 'submission':
      return (
        <div className="base">
          <i>{part.exerciseSubmissionLink}</i>
        </div>
      );
    case 'special':
      return (
        <div className="base">
          <i>
            Required skills: {part.requirements[0]}, {part.requirements[1]}
          </i>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, index) => {
        return (
          <div key={index}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

const Total = ({ totalParts }: { totalParts: CoursePart[] }) => (
  <p>
    Number of exercises{' '}
    {totalParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the hard course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total totalParts={courseParts} />
    </div>
  );
};

export default App;
