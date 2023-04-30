import { randomUUID, randomInt } from "crypto";
import { ParamLengthError, ParamMissingError } from "../../errors";
import wordList from "./wordList.json";

export interface UserConfig {
    username: string;
    password: string;
    streamKey: string;
}

export class UserConfig {
    /*The minimum length of a password */
    static PW_MIN_LENGTH: number = 12;

    /*The minimum length of a username */
    static UN_MIN_LENGTH: number = 10;

    constructor(username: string, pwHash: string) {
        if (!username || !pwHash) {
            throw new ParamMissingError(["username", "pwHash"], [!username ?? "username", !pwHash ?? "pwHash"]);
        }

        this.validateUsername(username);
        this.validatePassword(pwHash);

        this.buildStreamKey();
    }

    private validatePassword(pw: string) {
        if (pw.length < UserConfig.PW_MIN_LENGTH) {
            throw new ParamLengthError(pw.length, UserConfig.PW_MIN_LENGTH, "password");
        }

        // TODO: Add more rigorous validation

        this.password = pw;
    }

    private validateUsername(un: string) {
        if (un.length < UserConfig.UN_MIN_LENGTH) {
            throw new ParamLengthError(un.length, UserConfig.UN_MIN_LENGTH, "username");
        }

        // TODO: Add DB check

        this.username = un;
    }

    // This probably isn't perfect but it'll certainly do for the time being
    private buildStreamKey() {
        const do_iteration = () => {
            let adjective = wordList.adjectives[randomInt(wordList.adjectives.length)];
            let noun = wordList.nouns[randomInt(wordList.nouns.length)];
            let verb = wordList.verbs[randomInt(wordList.verbs.length)];

            let separator = () => wordList.separators[randomInt(wordList.separators.length)];

            let streamKey = `${adjective}${separator()}${noun}${separator()}${verb}`;

            let saltShaker = randomUUID({
                disableEntropyCache: true
            });

            let pinchOfSalt = saltShaker.split("-")[randomInt(saltShaker.split("-").length)]!;

            if (randomInt(0xdeadbeef) % 2) {
                streamKey += separator() + pinchOfSalt;
            } else {
                streamKey = pinchOfSalt + separator() + streamKey;
            }

            return streamKey;
        };

        // Just incase the above isn't random enough, do it 9 times and pick one at random
        let iterations = new Array(9);
        for (let i = 0; i < 9; i++) {
            iterations[i] = do_iteration();
        }

        this.streamKey = iterations[randomInt(iterations.length)];
    }
}
