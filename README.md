<p align="center">
  <img width="50" src="https://avatars.githubusercontent.com/u/7880972?s=280&v=4">
</p>

Table of contents
=================

<!--ts-->
* [Prerequisites](#prerequisites)
    * [Node/NPM](#node)
* [Development](#development)
* [Running Scraper](#running)
    * [CLI](#locally)
    * [REST](#rest)
    * [On PhantomBuster](#onbuster)
<!--te-->

Prerequisites
============
Here is a list of prerequisites you should need for running and making changes to the codebase.

Node/NPM
-----
Install Node runtime on your system:
- https://nodejs.org/en/download/

Development
============
Before everything you'll need to fill your Phantombuster config file (phantombuster.cson) with your API key. See [Reference](https://hub.phantombuster.com/docs/api#how-to-find-my-api-key).
```bash
# Add your API key there
cp phantombuster.cson.local phantombuster.cson

# Install dependencies
npm i
```

Run it:
```bash
npm run build:dev
```
or
```bash
npm run watch
```

Running Scraper
============
There are few different options to run a scraper and get your results.
1. Through your Command Line
2. Deploy to PhantomBuster directly and run it there
3. Through REST API served by Node.js (Nest.js) server

CLI
-----
```bash
node dist/index.js -q "Carte blanche" -n 3 -e true

option('-q, --inputQuery <value>', 'Recipe query to search for.')
option('-n, --numberOfPagesToScrape <value>', 'Number of pages to scrape.')
option('-e, --exportToJSONFile <true/false>', '[Optional] Export results to json instead stdout to CLI.')
```

After execution from CLI you will have results exported in stdout or results.json in your root directory.

<video controls>
  <source src="assets/cli.mov">
</video>

PhantomBuster
-----
```bash
phantombuster dist/index.js
```
After running the command You can now go to your catalog, click "Use this Phantom" (this is a user friendly way of saying "Create an agent from this script).

Go through the setup, you are on your agent's console. You should open your console to debug your script: open your management menu and click Toggle console. You can now launch it and see it run live!
<p align="center">
  <img src="https://i.postimg.cc/3NdR3CTw/Screenshot-2022-12-06-at-13-09-25.png">
</p>

REST
-----
