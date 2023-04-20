export class ParamLengthError extends Error {
    constructor(len: number, requiredLen: number) {
        const string = `Required: ${requiredLen} but got: ${len}`;
        super(string); 
    }
}
