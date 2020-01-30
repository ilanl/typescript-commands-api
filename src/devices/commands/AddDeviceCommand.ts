import { register } from "../../decorators";
import IDeviceRepository from "../repository/IDeviceRepository";
import { IRunnableCommand, ICommandOutput, ICommmandInputArguments } from "../business/ICommand";

@register({ name: 'add', help: 'add <device_type>, returns device id'})
class AddDeviceCommand implements IRunnableCommand {
  private _repository: IDeviceRepository;
  
  constructor(repository: IDeviceRepository) {
    this._repository = repository;
  }
  
  exec(args?: string[]): Promise<ICommandOutput> {
    return new Promise(async (resolve, reject) => {
      if (!args || args.length === 0) {
        reject(new Error('Could not add empty list of devices'))
      }
      let device_types = args
      console.log('types', device_types)
      let ids = []
      for (let type of device_types) {
        let { id } = await this._repository.create(type, {})
        ids.push(id)
      }
      resolve({ data: ids })
    })
  }
}

export default AddDeviceCommand