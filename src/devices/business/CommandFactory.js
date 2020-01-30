export class CommandFactory {
    constructor(deviceRepository) {
        this._deviceRepository = deviceRepository;
    }
    make(t, ...args) {
        return new t(this._deviceRepository);
    }
}
