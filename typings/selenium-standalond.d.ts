declare module 'selenium-standalone' {
  import { ChildProcess } from 'child_process';

  export function install(
    config: {
      progressCb: (
        totalLength: number,
        progressLength: number,
        chunkLength: number
      ) => void;
    },
    opts?: any
  ): Promise<void>;
  export function start(opts?: any): Promise<ChildProcess>;
}
