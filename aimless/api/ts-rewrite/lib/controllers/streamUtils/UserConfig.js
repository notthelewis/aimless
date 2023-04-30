"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConfig = void 0;
const crypto_1 = require("crypto");
const errors_1 = require("../../errors");
const wordList_json_1 = __importDefault(require("./wordList.json"));
class UserConfig {
    constructor(username, pwHash) {
        var _a, _b;
        if (!username || !pwHash) {
            throw new errors_1.ParamMissingError(["username", "pwHash"], [(_a = !username) !== null && _a !== void 0 ? _a : "username", (_b = !pwHash) !== null && _b !== void 0 ? _b : "pwHash"]);
        }
        this.validateUsername(username);
        this.validatePassword(pwHash);
        this.buildStreamKey();
    }
    validatePassword(pw) {
        if (pw.length < UserConfig.PW_MIN_LENGTH) {
            throw new errors_1.ParamLengthError(pw.length, UserConfig.PW_MIN_LENGTH, "password");
        }
        // TODO: Add more rigorous validation
        this.password = pw;
    }
    validateUsername(un) {
        if (un.length < UserConfig.UN_MIN_LENGTH) {
            throw new errors_1.ParamLengthError(un.length, UserConfig.UN_MIN_LENGTH, "username");
        }
        // TODO: Add DB check
        this.username = un;
    }
    // This probably isn't perfect but it'll certainly do for the time being
    buildStreamKey() {
        const do_iteration = () => {
            let adjective = wordList_json_1.default.adjectives[(0, crypto_1.randomInt)(wordList_json_1.default.adjectives.length)];
            let noun = wordList_json_1.default.nouns[(0, crypto_1.randomInt)(wordList_json_1.default.nouns.length)];
            let verb = wordList_json_1.default.verbs[(0, crypto_1.randomInt)(wordList_json_1.default.verbs.length)];
            let separator = () => wordList_json_1.default.separators[(0, crypto_1.randomInt)(wordList_json_1.default.separators.length)];
            let streamKey = `${adjective}${separator()}${noun}${separator()}${verb}`;
            let saltShaker = (0, crypto_1.randomUUID)({
                disableEntropyCache: true
            });
            let pinchOfSalt = saltShaker.split("-")[(0, crypto_1.randomInt)(saltShaker.split("-").length)];
            if ((0, crypto_1.randomInt)(0xdeadbeef) % 2) {
                streamKey += separator() + pinchOfSalt;
            }
            else {
                streamKey = pinchOfSalt + separator() + streamKey;
            }
            return streamKey;
        };
        // Just incase the above isn't random enough, do it 9 times and pick one at random
        let iterations = new Array(9);
        for (let i = 0; i < 9; i++) {
            iterations[i] = do_iteration();
        }
        this.streamKey = iterations[(0, crypto_1.randomInt)(iterations.length)];
    }
}
/*The minimum length of a password */
UserConfig.PW_MIN_LENGTH = 12;
/*The minimum length of a username */
UserConfig.UN_MIN_LENGTH = 10;
exports.UserConfig = UserConfig;
