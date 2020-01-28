import ICommandExecutor from "./ICommandExecutor";
import IDeviceRepository from "../repository/IDeviceRepository"
import { ICommandInput, ICommandOutput, IParser, IRunnableCommand } from "./ICommand";
import { CommandFactory, ICommandFactory } from "./CommandFactory";

export default class CommandExecutor implements ICommandExecutor {
  private _factory: ICommandFactory;
  private _parsers: IParser[];
  
  constructor(repository: IDeviceRepository, parsers: IParser[]) {
    this._factory = new CommandFactory(repository);
    this._parsers = parsers
  }
  
  run(input: ICommandInput): Promise<ICommandOutput> {
    return new Promise((resolve, reject) => {
      let command: IRunnableCommand
      for(let parser of this._parsers) {
        if(parser.descriptor.name === input.command) {
          command = parser.parse(input, this._factory)
          if (command) {
            resolve(command.exec(input.args))
          }
        }
     }
     if (!command) {
       reject(new Error('COMMAND_NOT_RECOGNIZED'))
     }
    })
  }
}