import * as express from 'express';
import CommandExecutor from '../business/CommandExecutor';
import DeviceRepository from '../repository/DeviceRepository';
import IDeviceRepository from '../repository/IDeviceRepository';
import { CommandFactory, ICommandFactory } from '../business/CommandFactory';
import * as commands from '../../devices/commands'

export default class CommandController {
  public path = '/commands';
  public router = express.Router();
  private _deviceRepository: IDeviceRepository;
  private _commandExecutor: CommandExecutor;
  private _factory: ICommandFactory;

  constructor() {

    // tslint:disable-next-line: no-console
    console.log('commands', {...commands})

    this._deviceRepository = new DeviceRepository();
    this._factory = new CommandFactory(this._deviceRepository);
    this._commandExecutor = new CommandExecutor(this._factory);
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.listCommandHelp);
    this.router.post(this.path, this.executeCommand);
  }

  listCommandHelp = async (request: express.Request, response: express.Response) => {
    const metadataIndex = this._factory.index()
    response.json(metadataIndex)
  }

  executeCommand = async (request: express.Request, response: express.Response) => {
    try {
      const { command, args } = request.body;
      const input = { command, args: { parameters: args } };
      const { data } = await this._commandExecutor.run(input);
      response.json(data);
    }
    catch (error) {
      response.status(403).json(error.message);
    }
  }
}