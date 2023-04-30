export class ParamLengthError extends Error {
    constructor(len: number, requiredLen: number, fieldName: string) {
        const message = `Error: ${fieldName} required length = '${requiredLen}', but got: '${len}'`;
        super(message);
    }
}

export class ParamMissingError extends Error {
    constructor(params: Array<any>, missing?: Array<any>) {
        let message = `Required ${JSON.stringify(params)}`;
        message += `${missing ?? `But was missing: ${JSON.stringify(message)}`}`;

        super(message);
    }
}
