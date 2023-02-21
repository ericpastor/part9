
interface ExerciseValues {
    targetValue: number, 
    hoursPerDayValue: number[]
}

export const parseArgsExercise = (
  target: number, 
  hoursPerDay: number[]
  ): ExerciseValues => {

    if (!isNaN(target) && !hoursPerDay.some(isNaN)) {
      return {
        targetValue: target,
        hoursPerDayValue: hoursPerDay
      };
    } 
    else {
      throw new Error('Provided values were not numbers!');
    }
  };

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

export const calculateExercise = (target: number, hoursPerDay: Array<number> ): Result => {
    
    const periodLength = hoursPerDay.length;
    const trainingDays = hoursPerDay.filter(h => h>0).length;
    const totalHours = (hoursPerDay.reduce((a, b) => a + b, 0));
    const average = totalHours/periodLength;
    const success = target <= average;

    let rating: number = 1 | 2 | 3;
    let ratingDescription = '';
    
    if( target > average && average < 2) 
    {rating = 1, ratingDescription = 'Keep working, still work to do';}

    if( target > average && average >= 2 && average <= 3 ) 
    {rating = 2, ratingDescription = 'You are doing well but still it can be improved';}

    if( target <= average && average >= 2 && average <= 3 ) 
    {rating = 2, ratingDescription = 'You are doing well but still it can be improved';}

    if( target < average && average >= 3 ) 
    {rating = 3, ratingDescription = 'Perfect! Just continue in that way';}
    
    return { 
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

// try {
//     const { targetValue, hoursPerDayValue } = parseArgsExercise();
//     console.log(calculateExercise(targetValue, hoursPerDayValue));
//   } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }



