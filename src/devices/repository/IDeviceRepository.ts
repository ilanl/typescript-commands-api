import IDeviceModel from "../models/IDeviceModel";

export default interface IDeviceRepository {
  getAll(): Promise<IDeviceModel[]>
  getById(id: string): Promise<IDeviceModel>
  create(type: string, params: any): Promise<IDeviceModel>
  update(device: IDeviceModel): Promise<IDeviceModel>
  delete(id: string): Promise<void>
}