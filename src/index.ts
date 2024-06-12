import * as readline from 'readline';

// Task List:
// set up CLI interface (done)
// create prompt for input (done)
// test input and return it (done)
// create a help command (done)
// create a help menu (done)
// create a command to quit the program (done)
// create a command to start the calculator

// Bug Fix List
// Troubleshoot error when quitting application 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function userInput(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, input => resolve(input.trim().toLowerCase())));
}

type CommandInput = (input: string) => Promise<boolean>;
interface Commands {
    [key: string]: CommandInput;
}

const inputCommands: Commands = {
    'q' : handleQuit,
    'quit': handleQuit,
    'h': handleHelp,
    'help': handleHelp,
    'b': handleBack,
    'back': handleBack,
};

async function handleHelp(input: string): Promise<boolean> {
    console.log(
        `\n ----- COMMANDS ----- \n` +
        `h or help: Shows the help page \n` +
        `q or quit: Quit the calculator \n` +
        `b or back: Back to main menu`
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
    console.clear();
    return true; 
}

async function handleUserInput(input: string): Promise<boolean> {
    if (input in inputCommands) {
        return await inputCommands[input](input);
    } else {
        console.log('You entered an invalid command.');
        return false;
    }
}

async function mainMenu(): Promise<boolean> {
    while (true) {
        const input = await userInput(
            '\n ----- MAIN MENU ----- \n \n' +
            `Input: `
        );
        console.log(`You entered: ${input}`);

        const shouldQuit = await handleUserInput(input);
        if (shouldQuit) {
            return true; 
        } else if (input === 'help' || input === 'h') {
            return false; 
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
        `\n Welcome to the Reverse Polish Notation Calculator \n` +
        `-------------------------- \n` +
        `Basic commands \n \n` +
        `Enter start to begin calculating \n` +
        `Enter help for the help menu`
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
