import path = require('path');
import fs = require('fs');
import https = require('https');

export function download(dir: string, name: string, url: string): Promise<string> {
  return new Promise((res, rej) => {
    const filePath = path.resolve(dir, name + path.extname(url));
    https.get(url, (msg) => {
      if (msg.statusCode === 200) {
        const stream = fs.createWriteStream(filePath);
        stream.on('finish', () => {
          msg.unpipe(stream);
          stream.close();
          res(filePath);
        });
        msg.pipe(stream);
      } else {
        rej(new Error(url));
      }
    });
  });
}

export function showSettledResult<T>(promises: PromiseSettledResult<T>[], items: string): void {
  const rejected: string[] = promises
    .filter((promise): promise is PromiseRejectedResult => promise.status === 'rejected')
    .map((v) => `${v.reason}`.slice('Error: '.length));
  if (rejected.length) console.warn('Failed downloads (Bad URL):', rejected);
  else console.info(`All ${items} downloaded! (${promises.length})`);
}
