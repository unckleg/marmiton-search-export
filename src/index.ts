'phantombuster command: nodejs';
'phantombuster package: 5';

import puppeteer from 'puppeteer';

import Marmiton from './marmiton';
import { PhantomBuster, Recipe, Runner } from './types';
import isInDocker from './util';

const isCLI = require.main === module && !isInDocker();
export const run: Runner = async (buster: PhantomBuster, marmiton: Marmiton): Promise<void> => {
  try {
    // Do arg populating and validation
    const args = buster.argument;
    await marmiton.populateAndValidateArgs(args);
  } catch (err) {
    console.error(`No arguments or schema validation failed: ${err}`); // eslint-disable-line no-console
    process.exit(1);
  }

  // Do inital page loading and search
  const { page } = await marmiton.load();

  // Do scraping, filtering and get response data back
  const resultObject: Recipe[] = await marmiton.scrape(page);
  await buster.setResultObject(resultObject);

  // Close page/browser and exit process
  await marmiton.done(page);
};

// Higher level IoC dependencies will allow us to inject them
// in our e2e tests later and test code properly.
const Buster = !isCLI ? require('phantombuster') : require('./phantombuster-cli').default; // eslint-disable-line @typescript-eslint/no-var-requires
(async () => {
  run(
    new Buster(),
    new Marmiton(
      await puppeteer.launch({
        args: ['--no-sandbox'],
      }),
    ),
  );
})();
