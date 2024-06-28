import * as readline from 'readline';
import { calculate } from './RPNCalculator';
import { clear } from 'console';
import { appTitle, borderArt, helpMenuTable, newProblemTable, welcomeMessage } from './messages';

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

async function loadingAnimation(
    text = "",
    chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
    delay = 100
) {
    let x = 0;

    return setInterval(function () {
        process.stdout.write("\r" + chars[x++] + " " + text);
        x = x % chars.length;
    }, delay)
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
    'clear': handleClear,
};

async function handleClear(): Promise<boolean> {
    const animation = await loadingAnimation('Clearing...', undefined, 100);

    await new Promise(resolve => setTimeout(resolve, 1000));

    clearInterval(animation);
    console.clear();
    return false;
}

export async function handleHelp(input: string): Promise<boolean> {
    console.log(`${helpMenuTable}`);
    return false;
}

export async function handleQuit(input: string): Promise<boolean> {
    const confirmQuit = await userInput('Do you want to quit? Enter "y" or "n": ');
    if (confirmQuit === 'y') {
        console.log('Shutting down.');
        rl.close();
        return true;
    } else {
        return false;
    }
}

export async function handleBack(input: string): Promise<boolean> {
    const animation = await loadingAnimation('Returning...', undefined, 100);

    await new Promise(resolve => setTimeout(resolve, 2000));

    clearInterval(animation);
    clear();
    await main();
    return true
}

async function enterNewProblem(): Promise<boolean> {
    console.log(`${newProblemTable}`);

    const confirmNewProblem = await userInput("Would you like to solve another problem? \n" +
        "Enter a command, or enter 'yes' \n" +
        "Enter a command: "
    );
    if (confirmNewProblem.trim().toLowerCase() === 'yes') {
        await startCalculator();
        clear()
        return true;
    } else if (confirmNewProblem === 'no') {
        return await handleBack(confirmNewProblem)
    } else if (confirmNewProblem in inputCommands) {
        return await handleUserInput(confirmNewProblem);
    } else {
        console.log('Invalid command entered');
        await enterNewProblem();
    }
    return false
}

export async function startCalculator(): Promise<boolean> {
    const stack: number[] = [];
    let tokenArr: string[] = [];
    let input: string;

    const animation = await loadingAnimation('Starting calculator...', undefined, 100);

    await new Promise(resolve => setTimeout(resolve, 2000));

    clearInterval(animation);
    clear();

    console.log(
        `${appTitle}\n` +
        `${borderArt}\n\n` +
        'Please enter a mathematical expression in Reverse Polish Notation format\n' +
        'This calculator will not accept standard PEMDAS format expressions\n'
    );

    do {
        input = await userInput('\n' + 'input: ');

        if (input.trim().toLowerCase() === 'start') {
            console.log('\nInitial Expression: ', userInput);
            console.log('Initial Stack:', stack);
            continue;
        }

        if (input in inputCommands) {
            const shouldQuit = await inputCommands[input](input);
            if (shouldQuit) {
                return true;
            }
            continue;
        }

        tokenArr = input.split(" ").filter((item) => item.trim() !== "");

        try {
            await calculate(stack, tokenArr);
            console.log('Calculation result:', stack[0]);
            await enterNewProblem();
            return true;
        } catch (error) {
            console.error('Error occurred during calculation:', error);
        }
    } while (true);
}

async function mainMenu(): Promise<boolean> {
    while (true) {
        const input = await userInput('Enter a command: ');

        const isCommandValid = await handleUserInput(input);
        if (isCommandValid) {
            return true;
        } else if (input === 'start') {
            await startCalculator();
        } else if (!isCommandValid && (input !== 'clear' && input !== 'help' && input !== 'h')) {
            console.log(`Invalid Command`);
        }
    }
}

async function helpMenu(): Promise<void> {
    while (true) {
        const input = await userInput('Input: ');

        if (input === 'back') {
            await handleBack(input);
        }

        const shouldQuit = await handleUserInput(input);
        if (shouldQuit) {
            process.exit();
        }
    }
}

async function main() {
    clear()
    console.log(
        `${appTitle}` +
        `\n` +
        `${borderArt}` +
        '\n' +
        `${welcomeMessage}\n`
    );
    console.log(
        `Basic commands\n\n` +
        `Enter 'start' to initialize the calculator\n` +
        `Enter 'help' for the help menu\n`
    );

    while (true) {
        const shouldQuit = await mainMenu();
        if (shouldQuit) {
            break;
        }
    }
    rl.close();
}

main().catch(error => console.error(error));
export { inputCommands, handleClear };
