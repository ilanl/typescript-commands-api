import { register } from '../../decorators';
import IDeviceRepository from '../repository/IDeviceRepository';
import { IRunnableCommand, ICommandOutput } from '../business/ICommand';

@register({ name: 'list', help: 'list | list --only <device_type1> <device_type2> ...' })
class ListDevicesCommand implements IRunnableCommand {
  private _repository: IDeviceRepository;

  constructor(repository: IDeviceRepository) {
    this._repository = repository;
  }

  exec(args?: string[]): Promise<ICommandOutput> {
    return new Promise((resolve, reject) => {
      let deviceTypes: string[] = [];
      if (args && args.length > 0) {
        args.shift();
        deviceTypes = args;
      }
      this._repository.getAll().then((devices) => {
        // eslint-disable-next-line max-len
        resolve({ data: devices.filter((d) => deviceTypes.length === 0 || deviceTypes.includes(d.type)) });
      }).catch((e) => reject(e));
    });
  }
}

export default ListDevicesCommand;
