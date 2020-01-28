import ICommandFactory from "./../commands/CommandFactory"  

export interface ICommandInput {
  command: string;
  args?: string[];
}

export interface ICommandOutput {
  data: any;
}

export interface IRunnableCommand {
  exec(args?): ICommandOutput;
}

export interface IParser {
  parse(input: ICommandInput, factory: ICommandFactory): IRunnableCommand
}