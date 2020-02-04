export interface ICommmandInputArguments {
    parameters: string[];
}

export interface ICommandInput {
    command: string;
    args?: ICommmandInputArguments;
}

export interface ICommandOutput {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

export interface IRunnableCommand {
    exec(args?: string[]): Promise<ICommandOutput>;
}