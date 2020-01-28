import IDeviceRepository from "./../dao/IDeviceRepository"

export interface ICommandFactory {
  make<T>(t: new(...constructorArgs:any[]) => T, ...args: any[]): T
}

export default class CommandFactory implements ICommandFactory {
  private _deviceRepository;
  constructor(deviceRepository: IDeviceRepository) {
    this._deviceRepository = deviceRepository
  }
  
  make<T>(t: new(...constructorArgs:any[]) => T, ...args: any[]): T {
    return new t(this._deviceRepository);
  }
}