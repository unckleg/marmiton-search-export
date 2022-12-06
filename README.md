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

CLI
-----

PhantomBuster
-----

REST
-----
