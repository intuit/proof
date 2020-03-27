declare module 'progress' {
  class ProgressBar {
    constructor(format: string, config: object);
    tick: (chunk: number) => void;
  }

  export = ProgressBar;
}
