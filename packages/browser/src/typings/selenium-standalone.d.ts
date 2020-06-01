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
  ): any;
  export function start(
    opts?: any,
    cb?: (err: any, child: ChildProcess) => any
  ): any;
}
