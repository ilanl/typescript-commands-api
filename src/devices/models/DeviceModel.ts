import IDeviceModel, { DeviceState } from "./IDeviceModel"

export default class DeviceModel implements IDeviceModel {
    readonly _id: string
    readonly _type: string
    attributes: {}
    public state: DeviceState

    constructor(id: string, type: string, attributes?: any) {
        this._id = id;
        this._type = type;
        this.attributes = attributes || {}
        this.state = DeviceState.Off
    }
    
    get id(): string {
        return this._id;
    }

    get type(): string {
        return this._type;
    }
}
