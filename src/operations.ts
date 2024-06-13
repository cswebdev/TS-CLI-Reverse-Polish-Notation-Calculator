type OperatorFunction = (a: number, b: number) => number;

const operatorFunctions: Record<string, OperatorFunction> = {
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "*": (a: number, b: number) => a * b,
    "/": (a: number, b: number) => a / b,
};

function isOperator(operator: string): boolean {
    return operator in operatorFunctions;
}

export { operatorFunctions, isOperator };
