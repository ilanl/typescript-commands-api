import { registry } from '../../decorators';
import { IRunnableCommand } from './ICommand';
import IDeviceRepository from '../repository/IDeviceRepository';

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
    const instance: IRunnableCommand = registry[commandName].create(this._deviceRepository) as IRunnableCommand;
    return instance
  }

  index():ICommandMetadata[] {
    const results: ICommandMetadata[] = []
    for (const property in registry) {
      if (registry.hasOwnProperty(property)) {
        const name = property;
        const metadata = registry[name];
        const { help } = metadata;
        results.push({ name, help })
      }
    }
    return results;
  }
}