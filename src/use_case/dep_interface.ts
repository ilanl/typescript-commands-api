export interface Dependency {
  getPrefix (arg: boolean): string;
  check()
}