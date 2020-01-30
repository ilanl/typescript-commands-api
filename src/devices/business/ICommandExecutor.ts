import { ICommandInput, ICommandOutput } from './ICommand';

export default interface ICommandExecutor {
  run(input: ICommandInput): Promise<ICommandOutput>
}