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

function userInput(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
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
    console.log(`\n ----- COMMANDS ----- \n` +
    `h or help: Shows the help page \n` +
    `q or quit: Quit the calculator \n` +
    `b or back: Back to main menu`
    );
    return false;
}

async function handleQuit(input: string): Promise<boolean> {
    const confirmQuit = await userInput('Do you want to quit? Enter "y" or "n": ');
    if (confirmQuit.toLowerCase() === 'y') {
        console.log('Shutting down.');
        rl.close();
        return true;
    }
    return false;
}

async function handleBack(input: string): Promise<boolean> {
    return true; 
}

async function mainMenu() {
    while (true) {
        const input = await userInput('\n ----- MAIN MENU ----- \n \n' +
            `Input: `
        );
        console.log(`You entered: ${input}`);

        if (input in inputCommands) {
            const shouldQuit = await inputCommands[input](input);
            if (shouldQuit) {
                break;
            }
        } else {
            console.log('You entered an invalid command.');
        }
    }
}

async function helpMenu() {
    while (true) {
        const input = await userInput('\n Enter a command: \n ');
        console.log(`You entered: ${input}`);

        if (input === 'back') {
            return; 
        } else if (input in inputCommands) {
            const shouldQuit = await inputCommands[input](input);
            if (shouldQuit) {
                return;
            }
        } else {
            console.log('You entered an unrecognized command.');
        }
    }
}

async function main() {
    console.log(`\n Welcome to the Reverse Polish Notation Calculator \n` +
    `-------------------------- \n` +
    `Basic commands \n \n` +
    `Enter start to begin calculating \n` +
    `Enter help for the help menu`)
    
    while (true) {
        await mainMenu();
        await helpMenu();
    }
}

main().catch(error => console.error(error));
