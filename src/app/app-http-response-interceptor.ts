import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from './shared/services/toast.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only apply to POST and PUT requests
    if (req.method === 'POST' || req.method === 'PUT') {
      return next.handle(req).pipe(
        // Handle errors
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred, please contact support.';
          if (error.status === 0) {
            errorMessage = 'Network error';
          } else if (error.status >= 400 && error.status < 500) {
            errorMessage = 'Client error occurred';
          } else if (error.status >= 500) {
            errorMessage = 'Server error occurred';
          }

          this.toastService.showError(errorMessage);
          return throwError(error);
        })
      );
    }

    // If it's not a POST or PUT request, let it pass through without any action
    return next.handle(req);
  }
}
