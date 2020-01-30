import { register } from "../../decorators";
import IDeviceRepository from "../repository/IDeviceRepository";
import { IRunnableCommand, ICommandOutput, ICommmandInputArguments } from "../business/ICommand";

@register({ name: 'list', help: 'list | list --only <device_type1> <device_type2> ...'})
class ListDevicesCommand implements IRunnableCommand {
  private _repository: IDeviceRepository;
  
  constructor(repository: IDeviceRepository) {
    this._repository = repository;
  }
  
  exec(args?: string[]): Promise<ICommandOutput> {
    return new Promise(async (resolve, reject) => {
      let device_types: string[] = [];
      if (args && args.length > 0) {
        args.shift();
        device_types = args;
      }
      let devices = await this._repository.getAll();
      resolve({ data: devices.filter((d) => device_types.length === 0  || device_types.includes(d.type) ) });
    })
  }
}

export default ListDevicesCommand