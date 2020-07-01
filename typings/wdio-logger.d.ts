declare module '@wdio/logger' {
  export type MethodFactory = (
    methodName: 'info' | 'warn' | 'error',
    logLevel: string,
    loggerName: string
  ) => (...args: any[]) => void;

  export interface Logger {
    methodFactory: MethodFactory;
  }
  export default function getLogger(name: string): Logger;
}
