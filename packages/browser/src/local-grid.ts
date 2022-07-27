import { ChildProcess } from 'child_process';

import selenium from 'selenium-standalone';
import Progress from 'progress';

export class LocalGrid {
  install: Promise<void>;

  process?: ChildProcess;

  constructor(options?: { install?: boolean }) {
    let progress: Progress;

    if (options?.install) {
      this.install = selenium.install({
        progressCb(total: number, progressLength: number, chunk: number) {
          progress =
            progress ||
            new Progress('Selenium installation [:bar] :percent :etas', {
              total,
              complete: '=',
              incomplete: ' ',
              width: 20,
            });

          progress.tick(chunk);
        },
      });
    } else {
      this.install = Promise.resolve();
    }
  }

  async start(port = 4444): Promise<ChildProcess> {
    if (this.process) {
      return this.process;
    }

    await this.install;

    this.process = await selenium.start({
      seleniumArgs: ['--port', `${port}`],
    });

    return this.process;
  }

  end() {
    if (this.process) {
      const end = this.process.kill();

      this.process = undefined;
      return end;
    }
  }
}

let instance: LocalGrid;

export default function getInstance(create = false) {
  if (!instance && create) {
    instance = new LocalGrid({ install: true });
  }

  return instance;
}
