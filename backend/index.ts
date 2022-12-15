import path = require('path');
import {
  downloadKeyboardImages,
  downloadSwitchImages,
  generateKeyboardJSON,
  generateSwitchJSON,
} from './keyboards-json/index';

generateKeyboardJSON(path.resolve('src', 'data', 'keyboards.json'));
generateSwitchJSON(path.resolve('src', 'data', 'switches.json'));

/* path.resolve('src', 'assets', 'images', 'keyboards') */
downloadKeyboardImages().then((promises) => {
  const rejected = promises
    .filter((promise): promise is PromiseRejectedResult => promise.status === 'rejected')
    .map((v) => `${v.reason}`.slice('Error: '.length));
  if (rejected.length) console.log('Failed downloads (Bad URL):', rejected);
  else console.log(`All images downloaded! (${promises.length})`);
});

downloadSwitchImages().then((promises) => {
  const rejected = promises
    .filter((promise): promise is PromiseRejectedResult => promise.status === 'rejected')
    .map((v) => `${v.reason}`.slice('Error: '.length));
  if (rejected.length) console.log('Failed downloads (Bad URL):', rejected);
  else console.log(`All images downloaded! (${promises.length})`);
});
