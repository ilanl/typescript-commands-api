import { ICommandFactory } from "./CommandFactory"

export interface ICommandInput {
  command: string;
  args?: string[];
}

export interface ICommandOutput {
  data: any;
}

export interface ICommandDescriptor {
  name: string
  help: string
}

export interface IRunnableCommand {
  exec(args?): ICommandOutput;
}

export interface IParser {
  descriptor: ICommandDescriptor
  parse(input: ICommandInput, factory: ICommandFactory): IRunnableCommand
}
