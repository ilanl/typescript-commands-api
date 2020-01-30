import { register } from '../../decorators';
import { IRunnableCommand, ICommandOutput } from '../business/ICommand';
import IDeviceRepository from '../repository/IDeviceRepository';
import { DeviceState } from '../models/IDeviceModel';

@register({name: 'switch', help: 'switch <device_id> on | off'})
class SwitchDeviceCommand implements IRunnableCommand {

  private _repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this._repository = repository;
  }

  async exec(args?: string[]): Promise<ICommandOutput> {
    return new Promise(async (resolve, reject) => {
      const [state, id] = args;
      const device = await this._repository.getById(id)
      device.state = state.toLocaleLowerCase() === 'on' ? DeviceState.On : DeviceState.Off
      await this._repository.update(device)
      resolve({
        data: device
      })
    })
  }
}

export default SwitchDeviceCommand