import * as readline from 'readline';
import calculate from './RPNCalculator';

// Task List:
// set up CLI interface (done)
// create prompt for input (done)
// test input and return it (done)
// create a help command (done)
// create a help menu (done)
// create a command to quit the program (done)
// create a command to start the calculator (done)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function userInput(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, input => resolve(input.trim().toLowerCase())));
}

async function handleUserInput(input: string): Promise<boolean> {
    if (input in inputCommands) {
        return await inputCommands[input](input);
    } else {
        return false;
    }
}

type CommandInput = (input: string) => Promise<boolean>;
interface Commands {
    [key: string]: CommandInput;
}

const inputCommands: Commands = {
    'q': handleQuit,
    'quit': handleQuit,
    'h': handleHelp,
    'help': handleHelp,
    'b': handleBack,
    'back': handleBack,
    'start': startCalculator,
};

async function handleHelp(input: string): Promise<boolean> {
    console.log(
        `\n----- COMMANDS -----\n` +
        `h or help: Shows the help page\n` +
        `q or quit: Quit the calculator\n` +
        `b or back: Back to main menu\n` +
        `start: Start the calculator\n`
    );
    return false;
}

async function handleQuit(input: string): Promise<boolean> {
    const confirmQuit = await userInput('Do you want to quit? Enter "y" or "n": ');
    if (confirmQuit === 'y') {
        console.log('Shutting down.');
        rl.close();
        return true;
    }
    return false;
}

async function handleBack(input: string): Promise<boolean> {
    return true;
}

async function startCalculator(): Promise<boolean> {
    console.log(
        '\n' +
        'Starting calculator...\n' +
        '------------------------\n'
    );

    const stack: number[] = [];
    let tokenArr: string[] = [];
    let input: string;

    do {
        console.log('Please enter a mathematical expression in Reverse Polish Notation format');
        input = await userInput('\n Calculate function input: ');

        if (input.trim().toLowerCase() === 'start') {
            console.log('\n Initial Expression: ', userInput);
            console.log('Initial Stack:', stack);
            continue; 
        }

        tokenArr = input.split(" ").filter((item) => item.trim() !== "");

        try {
            await calculate(stack, tokenArr);
            console.log('Calculation result:', stack[0]);
            return true; 
        } catch (error) {
            console.error('Error occurred during calculation:', error);
        }
    } while (true);
}
async function mainMenu(): Promise<boolean> {
    while (true) {
        const input = await userInput(
            '\n----- MAIN MENU -----\n' +
            '\n' +
            'Input: '
        );
        console.log(`You entered: ${input}`);

        const shouldQuit = await handleUserInput(input);
        if (shouldQuit) {
            return true;
        } else if (input === 'help' || input === 'h') {
            return false;
        } else if (input === 'start') {
            await calculatorMenu();
        }
    }
}

async function calculatorMenu(): Promise<void> {
    while (true) {
        const input = await userInput('Enter a mathematical expression: ');
        if (input.toLowerCase() === 'back') {
            return;
        }
    }
}

async function helpMenu(): Promise<void> {
    while (true) {
        const input = await userInput('Input: ');
        console.log(`You entered: ${input}`);

        if (input === 'back') {
            return;
        }

        const shouldQuit = await handleUserInput(input);
        if (shouldQuit) {
            process.exit();
        }
    }
}

async function main() {
    console.log(
        `Welcome to the Reverse Polish Notation Calculator\n` +
        `-------------------------------------------------\n` +
        `\n` +
        `Basic commands\n\n` +
        `Enter 'start' to initialize the calculator\n` +
        `Enter 'help' for the help menu`
    );

    while (true) {
        const shouldQuit = await mainMenu();
        if (shouldQuit) {
            break;
        }
        await helpMenu();
    }
}

main().catch(error => console.error(error));
