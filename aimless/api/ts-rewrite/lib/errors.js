"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamMissingError = exports.ParamLengthError = void 0;
class ParamLengthError extends Error {
    constructor(len, requiredLen, fieldName) {
        const message = `Error: ${fieldName} required length = '${requiredLen}', but got: '${len}'`;
        super(message);
    }
}
exports.ParamLengthError = ParamLengthError;
class ParamMissingError extends Error {
    constructor(params, missing) {
        let message = `Required ${JSON.stringify(params)}`;
        message += `${missing !== null && missing !== void 0 ? missing : `But was missing: ${JSON.stringify(message)}`}`;
        super(message);
    }
}
exports.ParamMissingError = ParamMissingError;
