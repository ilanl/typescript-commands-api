import IDeviceRepository from '../../devices/repository/IDeviceRepository';

export const registry: {
  [name: string]: {
    help: string;
    create: (repository: IDeviceRepository) => any;
  };
} = {};

export const register = (options) =>
  // tslint:disable-next-line: only-arrow-functions
  function (target) {
    // console.log('class target:', options);
    const original = target;

    function construct(c, args) {
      return new c(args);
    }

    // the new constructor behaviour
    // tslint:disable-next-line: only-arrow-functions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const f: any = function (args) {
      // tslint:disable-next-line: no-console
      // console.log(`New: ${original.name} is created`);
      return construct(original, args);
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    registry[options.name] = {
      help: options.help,
      create: (repository: IDeviceRepository) => {
        // tslint:disable-next-line: no-console
        // console.log('creating instance', repository);
        return construct(f, repository);
      },
    };

    return f;
  };
