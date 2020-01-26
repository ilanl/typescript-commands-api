import { Dependency } from './dep_interface';

export class Simple {
  dependency: Dependency;
  
  constructor(dependency: Dependency) {
    this.dependency = dependency;
  }

  makeSimple(): string {
    if (this.dependency.getPrefix(true) === 'A') {
      try {
        this.dependency.check()
      } catch (e) {
        console.error('Got error handled')
      }
      return 'Found A'
    }
    else {
      return 'Not Found'
    }
  }
}