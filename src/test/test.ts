import { userInput } from '../index';
import * as readline from 'readline';


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

describe('userInput', () => {
    it('should not return an empty string', async () => {
        const query = "enter any input: ";
        const input = "test input";

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) as jest.Mocked<readline.Interface>;

        // Mock the question method to simulate user input
        rl.question.mockImplementation((query: string, options: any, callback: (input: string) => void) => {
            callback(input);
        });

        const result = await userInput(query);
        expect(result).toBe(input);

        rl.close();
    });
});
