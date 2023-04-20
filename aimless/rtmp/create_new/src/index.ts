import { Command } from "commander";
import { UserConfig } from "./UserConfigGenerator";
import { buildConfig } from "./NGINXConfigGenerator";

const prog = new Command("ConfigGenerator")
    .version("0.0.0")
    .description("An NGINX config generator for Aimless streaming services")
    .option("-u [username]", "The user's username'")
    .option("-p [password]", "The user's password'")
    .parse(process.argv);


const userConfig = new UserConfig(prog);
const NGINXConfig = buildConfig(userConfig);

console.log(NGINXConfig);
