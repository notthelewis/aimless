"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserConfig_1 = require("./UserConfig");
const NginxConfig_1 = require("./NginxConfig");
const streamUtils = (0, express_1.Router)();
streamUtils.post("/start-stream-service", (req, res) => {
    const { username, pwHash } = req.body;
    try {
        // TODO: Use JSON Schema validator rather than wrapping logic in here
        const userConfig = new UserConfig_1.UserConfig(username, pwHash);
        const nginxconfig = (0, NginxConfig_1.buildConfig)(userConfig);
        console.log(nginxconfig);
        // TODO: send off AWS request to build new server
        // TODO: store server details in DB somewhere
        res.json({
            streamKey: userConfig.streamKey
        });
    }
    catch (e) {
        const err = e;
        res.render("409", {
            message: err.message
        });
    }
});
exports.default = streamUtils;
