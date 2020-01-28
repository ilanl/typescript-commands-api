import IDeviceRepository from "../dao/IDeviceRepository"
import { ICommandInput, ICommandOutput } from "../commands/ICommand";
import CommandFactory, { ICommandFactory } from "../commands/CommandFactory";

// Commands to load using reflection
import RegisterParser from "./../commands/Register/RegisterParser"

export default class CommandService {
  private _factory: ICommandFactory;
  constructor(repository: IDeviceRepository) {
    this._factory = new CommandFactory(repository);
  }

  run(input: ICommandInput): Promise<ICommandOutput> {
    // Loop in folders to check all commands reflection
    return new Promise((resolve, reject) => {
      let command = new RegisterParser().parse(input, this._factory)
      let result = command.exec(input.args)
      resolve(result) 
    })
  }
}