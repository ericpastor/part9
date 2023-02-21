// interface BmiValues {
//     valueHeigh: number, 
//     valueWeight: number
// }

// const parseArgsBmi = (args: Array<string>): BmiValues => {
//   if (args.length < 4) throw new Error('Not enough arguments')
//   if (args.length > 4) throw new Error('Too many arguments')

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//         valueHeigh: Number(args[2]),
//         valueWeight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }


export const calculateBmi = (height: number, weight: number): string => {
   
   const bmi = (weight/((height/100)*(height/100)));

    if (bmi <16.0) return 'Underweight (Severe thinness)';
    if (bmi >=16.0 && bmi<=16.99) return 'Underweight (Moderate thinness)';
    if (bmi >=17.0 && bmi<=18.49) return 'Underweight (Mild thinness)';
    if (bmi >=18.5 && bmi<=24.99) return 'Normal range';
    if (bmi >=25.0 && bmi<=29.99) return 'Overweight (Pre-obese)';
    if (bmi >=30.0 && bmi<= 34.99) return 'Obese (Class I)';
    if (bmi >=35.0 && bmi<= 39.99) return 'Obese (Class II)';
    if (bmi >=40) return 'Obese (Class III)';

   console.log(bmi);

   return (`${bmi}`);
};
// try {
//     const { valueHeigh, valueWeight } = parseArgsBmi(process.argv)
//     console.log(calculateBmi(valueHeigh, valueWeight))
//   } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }

