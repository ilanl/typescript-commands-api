import IDeviceModel from "../models/IDeviceModel";

export default interface IDeviceRepository {
  getAll(): IDeviceModel[]
  getById(id: string): IDeviceModel
  create(type: string, params: any): IDeviceModel
  update(device: IDeviceModel): void
  delete(id: string)
}