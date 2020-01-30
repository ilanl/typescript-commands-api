import * as shortid from 'shortid';
import IDeviceRepository from './IDeviceRepository';
import IDeviceModel from '../models/IDeviceModel';
import DeviceModel from '../models/DeviceModel';

export default class DeviceRepository implements IDeviceRepository {

  private _devices: { [id: string] : IDeviceModel } = {};

  getAll(): Promise<IDeviceModel[]> {
    return new Promise((resolve , reject) => {
      try {
        const devices:IDeviceModel[] = []
        for (const id in this._devices) {
          if (this._devices.hasOwnProperty(id)) {
            const device = this._devices[id] as IDeviceModel
            devices.push(device)
          }
        }
        resolve(devices)
      }
      catch (e) {
        reject(e);
      }
    })
  }

  getById(id: string): Promise<IDeviceModel> {
    return new Promise((resolve , reject) => {
      try {
        const foundDevice: IDeviceModel = this._devices[id]
        if (!foundDevice) {
          reject(new Error('DEVICE_NOT_FOUND'))
        }
        resolve(foundDevice)
      }
      catch(e) {
        reject(e);
      }
    })
  }

  create(type: string, params: any): Promise<IDeviceModel> {
    return new Promise((resolve, reject) => {
      try {
        const randomId = shortid.generate();
        const device = new DeviceModel(randomId, type, params);
        this._devices[randomId] = device;
        resolve(device)
      }
      catch (e) {
        reject(e)
      }
    })
  }

  update(device: IDeviceModel): Promise<IDeviceModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const found: IDeviceModel = await this.getById(device.id)
        if (found.type !== device.type) {
          reject(new Error('DEVICE_TYPE_READONLY'))
        }
        found.state = device.state
        found.attributes = device.attributes
        resolve(found)
      }
      catch (e) {
        reject(e)
      }
    })
  }

  delete(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.getById(id)
        delete this._devices[id]
        resolve()
      }
      catch (e) {
        reject(e)
      }
    })
  }
}