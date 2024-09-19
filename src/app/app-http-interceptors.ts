import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppHttpLoaderInterceptor } from './app-http-loader-interceptor';
import { ResponseInterceptor } from './app-http-response-interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpLoaderInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true,
  },
];
