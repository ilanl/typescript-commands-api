import IDeviceRepository from "./IDeviceRepository";
import IDeviceModel from "../models/IDeviceModel";
import DeviceModel from "../models/DeviceModel";
import * as shortid from "shortid"

export default class DeviceRepository implements IDeviceRepository {

  private _devices: { [id: string] : IDeviceModel } = {};

  getAll(): IDeviceModel[] {
    let all:IDeviceModel[] = []
    for (let id in this._devices) {
      if (this._devices.hasOwnProperty(id)) {
        let device = <IDeviceModel>this._devices[id]
        all.push(device)
      }
    }
    return all
  }
  
  getById(id: string): IDeviceModel {
    let foundDevice: IDeviceModel = this._devices[id]
    if (!foundDevice) {
      throw new Error('DEVICE_NOT_FOUND')
    }
    return foundDevice
  }
  
  create(type: string, params: any): IDeviceModel {
    let randomId = shortid.generate();
    let device = new DeviceModel(randomId, type, params);
    this._devices[randomId] = device;
    return device;
  }

  update(device: IDeviceModel): void {
    let found: IDeviceModel = this.getById(device.id)
    if (found.type !== device.type) {
      throw new Error('DEVICE_TYPE_READONLY')
    }
    found.attributes = device.attributes
  }

  delete(id: string) {
    this.getById(id)
    delete this._devices[id]
  }
}