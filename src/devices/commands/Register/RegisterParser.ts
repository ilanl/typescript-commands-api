
import { IParser, ICommandInput, IRunnableCommand } from "../ICommand";
import { ICommandFactory } from "../CommandFactory";
import RegisterCommand from "./RegisterCommand";

export default class RegisterParser implements IParser {
  
  parse(input: ICommandInput, factory: ICommandFactory): IRunnableCommand {
    if (input.command !== 'add') {
      return null
    }
    return factory.make(RegisterCommand)
  }
}