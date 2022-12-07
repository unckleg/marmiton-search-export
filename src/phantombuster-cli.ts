import * as fs from 'fs';

import { InputArgs } from './types';

export default class PhantombusterCli {
  public argument: Record<string, any>;

  constructor() {
    this.argument = this.parseCLIArguments();
  }

  public async setResultObject(object: object): Promise<void> {
    if (this.argument.exportToJSONFile) {
      await fs.writeFileSync('results.json', JSON.stringify(object, null, 4));
      return;
    }

    console.log(JSON.stringify(object, null, 4)); // eslint-disable-line no-console
  }

  protected parseCLIArguments = (): InputArgs => {
    const commander = require('commander'); // eslint-disable-line @typescript-eslint/no-var-requires
    commander
      .version('1.0.0', '-v, --version')
      .option('-q, --inputQuery <value>', 'Recipe query to search for.')
      .option('-n, --numberOfPagesToScrape <value>', '[Optional] Number of pages to scrape.')
      .option('-e, --exportToJSONFile <true/false>', '[Optional] Export results to json instead stdout to CLI.')
      .parse(process.argv);

    const options = commander.opts();
    return options;
  };
}
