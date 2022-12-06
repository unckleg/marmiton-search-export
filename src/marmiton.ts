import { Browser, Page } from 'puppeteer';
import * as yup from 'yup';

import { InputArgs, Recipe } from './types';

export default class Marmiton {
  protected baseURL = 'https://www.marmiton.org';
  protected mainDOMSelector = '#__next';
  protected inputTypeSearchSelector = 'input[type="search"]';
  protected recipeContainerSelector = '[data-ad-sticky-reference="#pegasus_300_atf"]';
  protected recipeNumberOfReviewsSelector = 'MRTN__sc-30rwkm-3 fyhZvB';
  protected inputQuery = '';
  protected numberOfPagesToScrape = 1;
  protected inputSchema = yup.object({
    inputQuery: yup.string().min(2).max(32).required(),
    numberOfPagesToScrape: yup.number().nullable(),
  });

  constructor(protected readonly browser: Browser) {}

  async load(): Promise<{ page: Page; browser: Browser }> {
    const page = await this.browser.newPage();
    await page.goto(this.baseURL, { waitUntil: 'networkidle2' });
    await page.waitForSelector(this.mainDOMSelector);

    await page.waitForSelector(this.inputTypeSearchSelector);
    await page.focus(this.inputTypeSearchSelector);
    await page.keyboard.type(this.inputQuery);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    await page.waitForSelector(this.recipeContainerSelector);
    return { page, browser: this.browser };
  }

  async populateAndValidateArgs(args: InputArgs | null): Promise<void | Error> {
    if (!args) {
      throw new Error('Missing inputQuery argument.');
    }

    await this.inputSchema.validate(args);

    this.inputQuery = args.inputQuery as string;
    if (args.numberOfPagesToScrape) {
      this.numberOfPagesToScrape = args.numberOfPagesToScrape;
    }
  }

  async scrape(page: Page): Promise<Recipe[]> {
    // Do initial page scraping and get results
    let response: Recipe[] = [];
    response = await page.evaluate(
      (inBaseURL, recipeContainerSelector, recipeNumberOfReviewsSelector) => {
        const data: Recipe[] = [];
        const recipesChildNodes = document.querySelector(recipeContainerSelector)?.childNodes[2];
        const recipes = recipesChildNodes?.childNodes;
        recipes?.forEach((element: any) => {
          const spanElement = element.getElementsByTagName('span');
          const numberOfReviews = element.getElementsByClassName(recipeNumberOfReviewsSelector);
          data.push({
            rating: spanElement.length > 0 ? element.getElementsByTagName('span')[0].textContent : '',
            numberOfReviews: numberOfReviews.length > 0 ? numberOfReviews[0].textContent.replace(/\D/g, '') : '',
            name: element.getElementsByTagName('h4')[0].textContent,
            url: `${inBaseURL}${element.getAttribute('href')}`,
          });
        });
        return data;
      },
      this.baseURL,
      this.recipeContainerSelector,
      this.recipeNumberOfReviewsSelector,
    );

    if (this.numberOfPagesToScrape > 1) {
      await page.waitForSelector('.SHRD__sc-dvq2vt-1, .hWQlXg');
      const paginationNodes = await page.evaluate((): string[] => {
        const t = Array.prototype.slice.call(document.getElementsByClassName('SHRD__sc-dvq2vt-1 hWQlXg')[0].children);
        return (t || [])
          .map((item: HTMLAnchorElement) => {
            return item.getAttribute('href') || item.href;
          })
          .filter((x) => {
            return x;
          });
      });

      if (paginationNodes.length <= 0) {
        return response;
      }

      for (let i = 0; i <= this.numberOfPagesToScrape; i++) {
        const nextPage = paginationNodes[i];
        await page.goto(`${this.baseURL}${nextPage}`, { waitUntil: 'networkidle2' });
        await page.waitForSelector(this.mainDOMSelector);

        await page.waitForSelector(this.recipeContainerSelector);
        response = response.concat(
          await page.evaluate(
            (inBaseURL, recipeContainerSelector, recipeNumberOfReviewsSelector) => {
              const data: Recipe[] = [];
              const recipesChildNodes = document.querySelector(recipeContainerSelector)?.childNodes[2];
              const recipes = recipesChildNodes?.childNodes;
              if (!recipes || recipes.length <= 0) {
                return data;
              }

              recipes?.forEach((element: any) => {
                const spanElement = element.getElementsByTagName('span');
                const numberOfReviews = element.getElementsByClassName(recipeNumberOfReviewsSelector);
                data.push({
                  rating: spanElement.length > 0 ? element.getElementsByTagName('span')[0].textContent : '',
                  numberOfReviews: numberOfReviews.length > 0 ? numberOfReviews[0].textContent.replace(/\D/g, '') : '',
                  name: element.getElementsByTagName('h4')[0].textContent,
                  url: `${inBaseURL}${element.getAttribute('href')}`,
                });
              });
              return data;
            },
            this.baseURL,
            this.recipeContainerSelector,
            this.recipeNumberOfReviewsSelector,
          ),
        );
      }
    }

    return response;
  }

  async filter(): Promise<void> {
    console.log('Filtering'); // eslint-disable-line no-console
  }

  async done(page: Page): Promise<void> {
    await page.close();
    await this.browser.close();
    process.exit();
  }
}
