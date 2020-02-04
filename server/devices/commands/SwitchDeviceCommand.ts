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
  
  exec(args?: string[]): Promise<ICommandOutput> {
    return new Promise((resolve, reject) => {
      const [state, id] = args;
      this._repository.getById(id).then((device) => {
        device.state = state.toLocaleLowerCase() === 'on' ? DeviceState.On : DeviceState.Off
        this._repository.update(device).then((updatedDevice) => {
          resolve({
            data: updatedDevice
          })
        });
      }).catch((e) => {
        reject(e);
      });
    })
  }
}

export default SwitchDeviceCommand