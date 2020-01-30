import IDeviceRepository from '../../devices/repository/IDeviceRepository';

export let registry: {
  [name:string]: {
    help: string,
    create: (repository: IDeviceRepository)=>any }
} = {}

export const register = options => {
  // tslint:disable-next-line: only-arrow-functions
  return function (target) {

    // tslint:disable-next-line: no-console
    console.log('class target:', options);
    const original = target;

    function construct(c, args) {
        return new c(args);
    }

    // the new constructor behaviour
    // tslint:disable-next-line: only-arrow-functions
    const f: any = function (args) {
        // tslint:disable-next-line: no-console
        console.log(`New: ${original.name} is created`);
        return construct(original, args);
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    registry[options.name] = {
      help: options.help,
      create: (repository: IDeviceRepository) => {
        // tslint:disable-next-line: no-console
        console.log('creating instance', repository);
        return construct(f, repository);
      }
    }

    return f;
  };
}