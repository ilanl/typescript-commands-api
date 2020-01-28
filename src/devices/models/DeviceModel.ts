import IDeviceModel from "./IDeviceModel"

export default class DeviceModel implements IDeviceModel {
    readonly _id: string
    readonly _type: string
    attributes: {}

    constructor(id: string, type: string, attributes?: any) {
        this._id = id;
        this._type = type;
        this.attributes = attributes || {}
    }
    
    get id(): string {
        return this._id;
    }

    get type(): string {
        return this._type;
    }
}
