declare module 'selenium-standalone' {
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
  export function start(opts?: any): any;
}
