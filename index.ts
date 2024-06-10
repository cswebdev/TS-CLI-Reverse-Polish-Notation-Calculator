// import { calculate, Operator } from "./RPNCalculator";
import * as readline from 'readline'


// Task List:
// set up CLI interface
// create prompt for input
// test input and return it

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function userInput(query:string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve))
}

async function main() {

    const input = await userInput('Please type any input: ')
    console.log(`You entered: ${input}`)
    rl.close();
}

main().catch(error => console.error(error))