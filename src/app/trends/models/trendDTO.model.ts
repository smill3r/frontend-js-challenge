import { TrendProvider } from './trend-provider.model';

export interface TrendDTO {
  title: string;
  body: string;
  provider: TrendProvider;
  image: string;
  url: string;
}
