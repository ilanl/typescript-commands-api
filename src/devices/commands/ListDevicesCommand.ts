import { register } from '../../decorators';
import IDeviceRepository from '../repository/IDeviceRepository';
import { IRunnableCommand, ICommandOutput } from '../business/ICommand';

@register({ name: 'list', help: 'list | list --only <device_type1> <device_type2> ...'})
class ListDevicesCommand implements IRunnableCommand {
  private _repository: IDeviceRepository;

  constructor(repository: IDeviceRepository) {
    this._repository = repository;
  }

  exec(args?: string[]): Promise<ICommandOutput> {
    return new Promise(async (resolve, reject) => {
      let deviceTypes: string[] = [];
      if (args && args.length > 0) {
        args.shift();
        deviceTypes = args;
      }
      const devices = await this._repository.getAll();
      resolve({ data: devices.filter((d) => deviceTypes.length === 0  || deviceTypes.includes(d.type) ) });
    })
  }
}

export default ListDevicesCommand