import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendComposePageActions from '../actions/trends-compose-page.actions';
import { TrendService } from '../../trend.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  updateOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendComposePageActions.updateTrend),
      switchMap(({ changes, trend }) =>
        this.trendService.updateTrend(changes, trend.id).pipe(
          map((updateTrendResponse) => {
            if (updateTrendResponse.modified) {
              this.toastService.showSuccess('Article updated');
              return TrendsApiActions.updateTrendSuccess({ changes, trend });
            } else {
              this.toastService.showInfo('Article was not changed');
              return TrendsApiActions.noAction();
            }
          }),
          catchError(() => of(TrendsApiActions.updateTrendError()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private trendService: TrendService, private toastService: ToastService) {}
}
