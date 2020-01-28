import IDeviceRepository from "../../repository/IDeviceRepository";
import { IRunnableCommand, ICommandOutput, ICommandDescriptor } from "../../business/ICommand";

export default class RegisterCommand implements IRunnableCommand {
  
  private _repository;
  constructor(repository: IDeviceRepository) {
    this._repository = repository;
  }
  
  exec(args: any): ICommandOutput {
    let [type] = args
    let { id } = this._repository.create(type)
    return {
      data: {
        id
      }
    }
  }
}