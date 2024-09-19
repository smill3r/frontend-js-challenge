import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';
import { TrendDTO } from '../../models/trendDTO.model';

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

export const updateTrendSuccess = createAction(
  '[Trends/API] Update Trend Success',
  props<{ changes: Partial<TrendDTO>, trend: Trend }>()
);

export const updateTrendError = createAction('[Trends/API] Update Trend Error');

export const noAction = createAction('[Trends/API] No Action');
