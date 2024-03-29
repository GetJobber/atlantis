export interface ImportMap {
  name: string;
  alias: string;
}
export interface PlaygroundImports {
  [dependency: string]: Array<string | ImportMap>;
}
