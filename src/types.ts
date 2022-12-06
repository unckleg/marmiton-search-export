import Buster from 'phantombuster';
import Marmiton from './marmiton';

export type Runner = (buster: Buster, marmiton: Marmiton) => Promise<void>;
export type Recipe = {
  name: string;
  rating: string;
  numberOfReviews: number;
  url: string;
};
export type InputArgs = {
  inputQuery?: string;
  numberOfPagesToScrape?: number;
}
