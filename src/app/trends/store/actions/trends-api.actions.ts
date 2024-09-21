import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';
import { TrendDTO } from '../../models/trendDTO.model';
import { CreateTrendResponse } from '../../models/create-trend-response.model';
import { TrendResponse } from '../../models/trend-response.model';

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const createTrendSuccess = createAction(
  '[Trends/API] Create Trend Success',
  props<{ trend: Trend }>()
);


export const updateTrendSuccess = createAction(
  '[Trends/API] Update Trend Success',
  props<{ changes: Partial<TrendDTO>; trend: Trend }>()
);

export const deleteTrendSuccess = createAction(
  '[Trends/API] Delete Trend Success',
  props<{ id: string }>()
);

export const deleteTrendError = createAction('[Trends/API] Delete Trend Error');

export const updateTrendError = createAction('[Trends/API] Update Trend Error');

export const createTrendError = createAction('[Trends/API] Create Trend Error');

export const noAction = createAction('[Trends/API] No Action');
