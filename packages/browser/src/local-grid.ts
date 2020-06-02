import { ChildProcess } from 'child_process';

import selenium = require('selenium-standalone');
import Progress = require('progress');

export class LocalGrid {
  install: Promise<void>;

  process?: Promise<ChildProcess>;

  constructor(options?: { install?: boolean }) {
    let progress: Progress;

    if (options && options.install) {
      this.install = new Promise((resolve, reject) => {
        selenium.install(
          {
            progressCb(total, progressLength, chunk) {
              progress =
                progress ||
                new Progress('Selenium installation [:bar] :percent :etas', {
                  total,
                  complete: '=',
                  incomplete: ' ',
                  width: 20
                });

              progress.tick(chunk);
            }
          },
          (err: any, paths: any) => {
            if (err) {
              return reject(err);
            }

            resolve(paths);
          }
        );
      });
    } else {
      this.install = Promise.resolve();
    }
  }

  start(port: number = 4444): Promise<ChildProcess> {
    if (this.process) {
      return this.process;
    }

    this.process = this.install.then(() => {
      return new Promise((resolve, reject) => {
        selenium.start(
          { seleniumArgs: ['-port', `${port}`] },
          (err: any, child: ChildProcess) => {
            if (err) {
              // return reject(err);
            }

            return resolve(child);
          }
        );
      });
    });

    return this.process;
  }

  end() {
    if (this.process) {
      const end = this.process.then(child => {
        if (child) {
          child.kill();
        }
      });

      this.process = undefined;
      return end;
    }

    return Promise.resolve();
  }
}

let instance: LocalGrid;

export default function getInstance(create: boolean = false) {
  if (!instance && create) {
    instance = new LocalGrid({ install: true });
  }

  return instance;
}
