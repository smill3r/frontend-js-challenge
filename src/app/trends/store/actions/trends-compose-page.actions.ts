import { createAction, props } from "@ngrx/store";
import { TrendDTO } from "../../models/trendDTO.model";
import { Trend } from "../../models/trend.model";

export const updateTrend = createAction(
    '[Trend Compose Page] Update Trend',
    props<{ changes: Partial<TrendDTO>, trend: Trend }>()
  );
  