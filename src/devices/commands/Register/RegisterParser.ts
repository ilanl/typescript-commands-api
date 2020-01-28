
import { IParser, ICommandInput, IRunnableCommand, ICommandDescriptor } from "../../business/ICommand";
import { ICommandFactory } from "../../business/CommandFactory";
import RegisterCommand from "./RegisterCommand";

export default class RegisterParser implements IParser {
  
  get descriptor(): ICommandDescriptor {
    return {
      name: 'add',
      help: 'add <device_type>, returns the id of the added device'
    }
  }
  
  parse(input: ICommandInput, factory: ICommandFactory): IRunnableCommand {
    if (input.command !== 'add') {
      return null
    }
    return factory.make(RegisterCommand)
  }
}