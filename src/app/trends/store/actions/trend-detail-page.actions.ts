import { createAction, props } from '@ngrx/store';

export const deleteTrend = createAction(
  '[Trend Detail Page] Delete Trend',
  props<{ trendId: string }>()
);
