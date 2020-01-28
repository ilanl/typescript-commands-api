import express = require("express");
import CommandExecutor from "../business/CommandExecutor";
import { ICommandInput, IParser } from "../business/ICommand";
import DeviceRepository from "../repository/DeviceRepository";
import RegisterParser from "../commands/Register/RegisterParser";
import IDeviceRepository from "../repository/IDeviceRepository";

class CommandLoader {
  private _parsers: IParser[]
  private _loaded: boolean
  
  async parsers(): Promise<IParser[]> {
    if (!this._loaded) {
      this._parsers = await this.importParsers('../commands');
      this._loaded = true;
    }
    return this._parsers
  }
  
  private importParsers(directory): Promise<IParser[]> {
    return new Promise((resolve, reject) => {
      let results = [new RegisterParser()];
      resolve(results)
    })
  }
}

export default class CommandController {
  public path = '/commands';
  public router = express.Router();
  private _commandLoader;
  private _deviceRepository: IDeviceRepository;
  
  constructor() {
    this._commandLoader = new CommandLoader()
    this._deviceRepository = new DeviceRepository()
    this.intializeRoutes();
  }
  
  public intializeRoutes() {
    this.router.get(this.path, this.listCommandHelp);
    this.router.post(this.path, this.executeCommand);
  }
  
  listCommandHelp = async (request: express.Request, response: express.Response) => {
    let parsers = await this._commandLoader.parsers()
    let listCommands = parsers.map((p) => { 
      let { descriptor } = p
      let { name, help } = descriptor
      return { name, help }
    })
    response.json(listCommands);
  }
  
  executeCommand = async (request: express.Request, response: express.Response) => {
    let input = <ICommandInput>request.body;
    let parsers = await this._commandLoader.parsers()
    let { data } = await new CommandExecutor(this._deviceRepository, parsers).run(input)
    response.json(data)
  }
}