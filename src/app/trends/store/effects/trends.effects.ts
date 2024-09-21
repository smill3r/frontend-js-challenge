import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendComposePageActions from '../actions/trends-compose-page.actions';
import * as TrendDetailPageActions from '../actions/trend-detail-page.actions';
import { TrendService } from '../../trend.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

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

  createOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendComposePageActions.createTrend),
      switchMap(({ newTrend }) =>
        this.trendService.createTrend(newTrend).pipe(
          map((trend) => {
            if (trend) {
              this.toastService.showSuccess('Article created');
              return TrendsApiActions.createTrendSuccess({ trend });
            }
            return TrendsApiActions.noAction();
          }),
          catchError(() => of(TrendsApiActions.createTrendError()))
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

  deleteOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendDetailPageActions.deleteTrend),
      switchMap(({ trendId }) =>
        this.trendService.deleteTrend(trendId).pipe(
          map((deleteTrendResponse) => {
            if (deleteTrendResponse.success) {
              this.toastService.showSuccess('Article deleted');
              return TrendsApiActions.deleteTrendSuccess({ id: trendId });
            }
            this.toastService.showInfo('Article could not be deleted');
            return TrendsApiActions.deleteTrendError();
          }),
          catchError(() => of(TrendsApiActions.deleteTrendError()))
        )
      )
    );
  });

  navigateAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrendsApiActions.deleteTrendSuccess),
        tap(({ id }) => {
          return this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  navigateAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrendsApiActions.createTrendSuccess),
        tap(({ trend }) => this.router.navigate([`/trends/${trend.id}`]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private trendService: TrendService,
    private toastService: ToastService,
    private router: Router
  ) {}
}
