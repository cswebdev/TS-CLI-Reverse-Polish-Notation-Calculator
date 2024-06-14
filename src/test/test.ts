import { userInput, inputCommands, handleHelp, handleQuit, handleClear, handleBack, calculatorMenu, startCalculator } from '../index';
import * as readline from 'readline';
import { operatorFunctions, isOperator} from '../operations'
// import {stack, tokenArr, input} from '../RPNCalculator'


jest.mock('readline', () => {
    const originalModule = jest.requireActual('readline');

    return {
        ...originalModule,
        createInterface: jest.fn(() => ({
            question: jest.fn(),
            close: jest.fn(),
        })),
    };
});


describe('Identify operations from an input', () => {
    it('should correctly identify operators in the input array', () => {
        const inputArray = ['2', '7', '1', '+', '1', '/', '2', '-'];
        const expectedResults = [
            false, // '2'
            false, // '7'
            false, // '1'
            true,  // '+'
            false, // '1'
            true,  // '/'
            false, // '2'
            true   // '-'
        ];

        const results = inputArray.map(item => isOperator(item));
        
        expect(results).toEqual(expectedResults);
    });

    it('should correctly identify numbers in the input array', () => {
        const inputArray = ['1', '3', '10', '-', '2', '*']
        const expectedResults = [
            true, // '1'
            true, // '3'
            true, // '10'
            false, // '-'
            true, // '2'
            false, // '*'
        ]

        const isNumber = (item: string): boolean => {
            return !isNaN(Number(item)) && !isOperator(item);
        }

        const results = inputArray.map(isNumber);
        expect(results).toEqual(expectedResults);
    })

    it('should correctly perform addition operation', () => {
        const addResult = operatorFunctions['+'](2, 10);
        expect(addResult).toBe(12);
    });

    it('should correctly perform subtraction operation', () => {
        const subtractResult = operatorFunctions['-'](20, 5);
        expect(subtractResult).toBe(15);
    });

    it('should correctly perform multiplication operation', () => {
        const multiplyResult = operatorFunctions['*'](2, 2);
        expect(multiplyResult).toBe(4);
    });

    it('should correctly perform division operation', () => {
        const divideResult = operatorFunctions['/'](20, 5);
        expect(divideResult).toBe(4);
    });
});

jest.mock('../index.ts', () => {
    const originalModule = jest.requireActual('../index.ts');

    return {
        ...originalModule,
        handleHelp: jest.fn(),
        handleQuit: jest.fn(),
        handleClear: jest.fn(),
        handleBack: jest.fn(),
        calculatorMenu: jest.fn(),
        userInput: jest.fn(),
    };
});

describe('help commands should correctly call their respective commands', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
        process.env.NODE_ENV = 'test';
    });


    it('h should call handleHelp()', async () => {
        const input = 'h';

        inputCommands[input] = jest.fn(handleHelp);

        if (input in inputCommands) {
            await inputCommands[input](input);

            expect(handleHelp).toHaveBeenCalledWith(input); 
        }
    });

    it('help should call handleHelp()', async () => {
        const input = 'help';

        inputCommands[input] = jest.fn(handleHelp);

        if(input in inputCommands) {
            await inputCommands[input](input);

            expect(handleHelp).toHaveBeenCalledWith(input)
        }
    });

    it('q should call handleQuit()', async () => {
        const input = 'q';

        inputCommands[input] = jest.fn(handleQuit);

        if(input in inputCommands){
            await inputCommands[input](input);

            expect(handleQuit).toHaveBeenCalledWith(input)
        }
    });
    it('quit should call handleQuit()', async () => {
        const input = 'quit';

        inputCommands[input] = jest.fn(handleQuit);

        if(input in inputCommands){
            await inputCommands[input](input);

            expect(handleQuit).toHaveBeenCalledWith(input);
        }
    });

    it('clear should call handleClear()', async () => {
        const input = 'clear';

        inputCommands[input] = jest.fn(handleClear)

        if(input in inputCommands){
            await inputCommands[input](input);

            expect(handleClear).toHaveBeenCalledWith(input)
        }
    });

    it('back should call handleBack()', async () => {
        const input = 'back';

        inputCommands[input] = jest.fn(handleBack)

        if(input in inputCommands){
            await inputCommands[input](input);

            expect(handleBack).toHaveBeenCalledWith(input);
        }
    });

    it('a random input should not call any command and should log "Invalid Command"', async () => {
        const input = 'random';
        console.log = jest.fn(); 

        if (!(input in inputCommands)) {
            console.log('Invalid Command');
        }

        expect(console.log).toHaveBeenCalledWith('Invalid Command');
        expect(handleHelp).not.toHaveBeenCalledWith(input);
        expect(handleQuit).not.toHaveBeenCalledWith(input);
        expect(handleClear).not.toHaveBeenCalledWith(input);
        expect(handleBack).not.toHaveBeenCalledWith(input);
        expect(calculatorMenu).not.toHaveBeenCalledWith(input);
    });
})


    