import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { GetAllTrendsResponse } from './models/get-all-trends-response.model';
import { GetOneTrendResponse } from './models/get-one-trend-response.model';
import { Trend } from './models/trend.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { environment } from 'src/environments/environment';
import { UpdateTrendResponse } from './models/update-trend-response.model';
import { TrendDTO } from './models/trendDTO.model';
import { DeleteTrendResponse } from './models/remove-trend-response.model';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;

  public readonly getAllUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.getAllUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public updateTrend(
    trend: Partial<TrendDTO>,
    id: string
  ): Observable<UpdateTrendResponse> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient.put<UpdateTrendResponse>(url, trend);
  }

  public deleteTrend(id: string): Observable<DeleteTrendResponse> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient.delete<DeleteTrendResponse>(url);
  }

  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }
}
