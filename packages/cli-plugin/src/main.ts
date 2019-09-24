import { Option, Example } from 'command-line-application';

export interface CLIOption {
  options: Option[];
  examples?: Example[];
}

export type Arguments = Record<string, any>;

export default interface CLIPlugin {
  command: () => CLIOption;
  setArgs: (args: Arguments) => void;
}
