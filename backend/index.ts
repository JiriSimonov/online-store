import path = require('path');
import { downloadImages, generateKeyboardJSON } from './keyboards-json/index';

generateKeyboardJSON(path.resolve('src', 'data', 'keyboards.json'));

downloadImages(/* path.resolve('src', 'assets', 'images', 'keyboards') */).then((promises) => {
  const rejected = promises
    .filter((promise): promise is PromiseRejectedResult => promise.status === 'rejected')
    .map((v) => `${v.reason}`.slice('Error: '.length));
  if (rejected.length) console.log('Failed downloads (Bad URL):', rejected);
  else console.log(`All images downloaded! (${promises.length})`);
});
