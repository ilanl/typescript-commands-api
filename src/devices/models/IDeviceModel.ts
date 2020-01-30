
export enum DeviceState {
  Off = 'off',  
  On = 'on'
}

export default interface IDeviceModel {
  readonly id: string
  readonly type: string,
  state: DeviceState,
  attributes: {}
}