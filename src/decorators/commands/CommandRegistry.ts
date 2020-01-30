import IDeviceRepository from "../../devices/repository/IDeviceRepository";

export var registry: {
  [name:string]: {
    help: string,
    create: (repository: IDeviceRepository)=>any }
} = {}

export const register = options => {
  return function (target) {
    
    console.log('class target:', options);
    const original = target;
    
    function construct(c, args) {
        return new c(args);
    }

    // the new constructor behaviour
    const f: any = function (args) {
        console.log(`New: ${original['name']} is created`);
        return construct(original, args);
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    registry[options.name] = {
      help: options.help,
      create: (repository: IDeviceRepository) => { 
        console.log('creating instance', repository);
        return construct(f, repository);
      }
    }
    
    return f;
  };
}