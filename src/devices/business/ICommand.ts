export interface ICommmandInputArguments {
  parameters: string[]
}

export interface ICommandInput {
  command: string;
  args?: ICommmandInputArguments;
}

export interface ICommandOutput {
  data: any;
}

export interface IRunnableCommand {
  exec(args?: string[]): Promise<ICommandOutput>
}