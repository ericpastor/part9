import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, parseArgsExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) =>{
  const height = req.query.height; 
  const weight = req.query.weight;

  if(!Number(height) || !Number(weight)) 
  res.send({error: "malformatted parameters"});

  const bmi = calculateBmi(Number(height), Number(weight));

  res.send({height, weight, bmi});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {target, daily_exercises} = req.body;

  if(!target || !daily_exercises){
    res.send({error: 'parameters missing'});
  }
  try{
    const {targetValue, hoursPerDayValue} = parseArgsExercise(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      target, daily_exercises
    );

   res.json(calculateExercise(targetValue, hoursPerDayValue));

   return;

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
  
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});