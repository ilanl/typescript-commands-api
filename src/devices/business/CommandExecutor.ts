import ICommandExecutor from './ICommandExecutor';
import { ICommandInput, ICommandOutput, IRunnableCommand } from './ICommand';
import { ICommandFactory } from './CommandFactory';

export default class CommandExecutor implements ICommandExecutor {
  private _factory: ICommandFactory;

  constructor(factory: ICommandFactory) {
    this._factory = factory;
  }

  run(input: ICommandInput): Promise<ICommandOutput> {
    return new Promise((resolve, reject) => {
      try {
        const { command, args } = input;
        const cmd = this._factory.make(command);
        const output = cmd.exec(args.parameters);
        resolve(output);
      }
      catch(e) {
        reject(e);
      }
    })
  }
}