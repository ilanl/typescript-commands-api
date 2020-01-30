import { register } from '../../decorators';
import IDeviceRepository from '../repository/IDeviceRepository';
import { IRunnableCommand, ICommandOutput } from '../business/ICommand';

@register({ name: 'add', help: 'add <device_type>, returns device id' })
class AddDeviceCommand implements IRunnableCommand {
    private _repository: IDeviceRepository;

    constructor(repository: IDeviceRepository) {
        this._repository = repository;
    }

    exec(args?: string[]): Promise<ICommandOutput> {
        return new Promise((resolve, reject) => {
            if (!args || args.length === 0) {
                reject(new Error('Could not add empty list of devices'));
            }
            const ids = [];
            const promises = args.map((type) => this._repository.create(type));
            Promise.all(promises).then((devices) => {
                for (const device of devices) {
                    ids.push(device.id); 
                }
                resolve({ data: ids });
            }).catch((e) => { reject(e); })
        });
    }
}

export default AddDeviceCommand;
