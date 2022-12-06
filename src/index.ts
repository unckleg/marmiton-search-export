'phantombuster command: nodejs';
'phantombuster package: 5';

import Buster from 'phantombuster';
import puppeteer from 'puppeteer';
import { Runner, Recipe } from './types';
import Marmiton from './marmiton';

export const run: Runner = async (buster: Buster, marmiton: Marmiton): Promise<void> => {
  try {
    // Do arg populating and validation
    const args = buster.argument;
    await marmiton.populateAndValidateArgs(args);
  } catch (err) {
    console.error(`No arguments or schema validation failed: ${err}`);
    process.exit(1);
  }

  // Do inital page loading and search
  const { page } = await marmiton.load();

  // Do scraping, filtering and get response data back
  const resultObject: Recipe[] = await marmiton.scrape(page);
  await buster.setResultObject(resultObject);

  // Close page and exit process
  await marmiton.done(page);
};

// Higher level IoC dependencies will allow us to inject them
// in our unit tests later and test code properly.
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
