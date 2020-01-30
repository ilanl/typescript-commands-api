import ICommandExecutor from "./ICommandExecutor";
import { ICommandInput, ICommandOutput, IRunnableCommand } from "./ICommand";
import { ICommandFactory } from "./CommandFactory";

export default class CommandExecutor implements ICommandExecutor {
  private _factory: ICommandFactory;
  
  constructor(factory: ICommandFactory) {
    this._factory = factory;
  }
  
  run(input: ICommandInput): Promise<ICommandOutput> {
    return new Promise((resolve, reject) => {
      try {
        let { command, args } = input;
        let cmd = this._factory.make(command);
        console.log('extract args', args.parameters);
        let output = cmd.exec(args.parameters);
        resolve(output);
      }
      catch(e) {
        reject(e);
      }
    })
  }
}