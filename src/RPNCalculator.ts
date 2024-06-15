import { userInput } from "./index";
import { appTitle, borderArt } from "./messages";
import { isOperator, operatorFunctions } from './operations';

// Stacks numbers into the passed stack array and performs the calculation.
// The token array must be validated.
// Return the stack.
// param {number[]} stack
// param {string[]} tokenArr
// returns {number[]}

export async function calculate(
    stack: number[] = [],
    tokenArr: string[] = []
): Promise<number> {
   
    if (tokenArr.length === 0) {
        const input = await userInput('\n' + 'input: ');
        tokenArr = input.split(" ").filter(item => item.trim() !== "");
    }

    console.log(`\n Initial Expression: ${tokenArr.join(' ')}`);

    for (let i = 0; i < tokenArr.length; i++) {
        const item = tokenArr[i];
        console.log(`\n` + `step: ${i + 1}`)
        if (isOperator(item)) {
            const lastNumber = stack.pop();
            const secondLastNumber = stack.pop();

            if (lastNumber === undefined || secondLastNumber === undefined) {
                throw new Error("ERROR: Expression not valid. Expression not in Reverse Polish Notation format");
            }

            console.log(`Performing ${item} operation.`);
            console.log(`Pop ${lastNumber} and ${secondLastNumber}`);
            
            const result = operatorFunctions[item](secondLastNumber, lastNumber);
            console.log(`Calculate ${secondLastNumber} ${item} ${lastNumber} = ${result}`);
            
            stack.push(result);
            console.log(`Push ${result} onto the stack`);
        } else {
            const number = parseFloat(item);
            if (!isNaN(number)) {
                console.log(`Pushing ${number} onto the stack.`);
                stack.push(number);
            } else {
                throw new Error(`ERROR: Invalid token: ${item}`);
            }
        }
        console.log(`Stack: [${stack}]`);
    }

    if (stack.length !== 1) {
        if (stack.length > 1) {
            while (stack.length > 1) {
                const lastNumber = stack.pop();
                const secondLastNumber = stack.pop();
                const result = operatorFunctions['+'](secondLastNumber || 0, lastNumber || 0);
                console.log(`\n`)
                stack.push(result);
                }
                } else {
                    throw new Error("ERROR: Invalid expression: too many numbers left on the stack");
        }
    }
    return stack[0];   
}