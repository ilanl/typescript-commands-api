import express = require("express");
import CommandService from "./../services/CommandService";
import { ICommandInput } from "../commands/ICommand";
import IDeviceRepository from "../dao/IDeviceRepository";

export async function execute(req: express.Request, res: express.Response) {
  let input = <ICommandInput>req.body;
  let repository = <IDeviceRepository>(req["context"].repository);
  let service = new CommandService(repository);
  let { data } = await service.run(input)
  res.json(data)
}