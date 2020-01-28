import express = require("express");
import { execute } from "./../devices/controllers/CommandController";

var router = express.Router();

export class CommandRoutes {
    get routes () {
        router.post("/command", execute);
        return router;
    }
}