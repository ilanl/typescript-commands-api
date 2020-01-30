import { registry } from "../../decorators";
import { IRunnableCommand } from "./ICommand";
import IDeviceRepository from "../repository/IDeviceRepository";

export interface ICommandMetadata {
  name: string
  help: string
}

export interface ICommandFactory {
  index(): ICommandMetadata[];
  make(commandName: string): IRunnableCommand;
}

export class CommandFactory implements ICommandFactory {
  
  private _deviceRepository: IDeviceRepository;
  constructor(deviceRepository: IDeviceRepository) {
    this._deviceRepository = deviceRepository
  }
  
  make(commandName: string): IRunnableCommand {
    if (!registry[commandName]) {
      throw new Error('COMMAND_NOT_RECOGNIZED');
    }
    let instance: IRunnableCommand = <IRunnableCommand>registry[commandName].create(this._deviceRepository);
    return instance
  }
  
  index():ICommandMetadata[] { 
    let results: ICommandMetadata[] = []
    for (let property in registry) {
      if (registry.hasOwnProperty(property)) {
        let name = property;
        let metadata = registry[name];
        let { help } = metadata;
        results.push({ name, help })
      }
    }
    return results;
  }
}