import { Router, Request, Response } from "express";
import { UserConfig } from "./UserConfig";
import { buildConfig } from "./NginxConfig";

const streamUtils = Router();

streamUtils.post("/start-stream-service", (req: Request, res: Response) => {
    const { username, pwHash } = req.body;

    try {
        // TODO: Use JSON Schema validator rather than wrapping logic in here
        const userConfig = new UserConfig(username, pwHash);
        const nginxconfig = buildConfig(userConfig);
        console.log(nginxconfig);

        // TODO: send off AWS request to build new server
        // TODO: store server details in DB somewhere

        res.json({
            streamKey: userConfig.streamKey
        });
    } catch (e) {
        const err = e as Error;
        res.render("409", {
            message: err.message
        });
    }
});

export default streamUtils;
