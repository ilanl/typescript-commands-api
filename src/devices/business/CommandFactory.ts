import IDeviceRepository from "../repository/IDeviceRepository"

export interface ICommandFactory {
  make<T>(t: new(...constructorArgs:any[]) => T, ...args: any[]): T
}

export class CommandFactory implements ICommandFactory {
  
  private _deviceRepository: IDeviceRepository;
  constructor(deviceRepository: IDeviceRepository) {
    this._deviceRepository = deviceRepository
  }

  make<T>(t: new(...constructorArgs:any[]) => T, ...args: any[]): T {
    return new t(this._deviceRepository);
  }
}