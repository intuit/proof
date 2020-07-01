import { Test, TestService, TestCallback } from './types';

export * from './types';

let callbackService: TestService = () => {
  throw new Error('No callback service for test setup.');
};

// https://stackoverflow.com/a/29581862
function getCallerFile(): string {
  const original = Error.prepareStackTrace;
  Error.prepareStackTrace = (err, stack) => stack;
  const error = new Error();

  if (!error.stack) {
    throw new Error('Cannot get caller file: no stack to trace.');
  }

  let { stack } = (error as any) as { stack: NodeJS.CallSite[] };
  const currentFile = stack.shift()!.getFileName();
  let callerFile = currentFile;

  while (error.stack.length && currentFile === callerFile) {
    stack = (error.stack as any) as NodeJS.CallSite[];
    callerFile = stack.shift()!.getFileName();
  }

  Error.prepareStackTrace = original;
  return callerFile || '';
}

export function setCallbackService(service: TestService) {
  callbackService = service;
}

const test: Test = (config, callback) => {
  const file = getCallerFile();
  callbackService(config, callback, file);
};

test.skip = (config, callback) => test({ ...config, skip: true }, callback);

export default test;

export function proofsOf(kind: string) {
  return {
    add(story: string, callback: TestCallback) {
      callbackService(
        {
          kind,
          story,
          skip: false,
        },
        callback,
        getCallerFile()
      );
    },
  };
}
