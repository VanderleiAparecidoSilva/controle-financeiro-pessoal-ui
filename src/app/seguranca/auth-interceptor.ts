import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const header = request.urlWithParams.indexOf('/oauth/token');

    if (token && header === -1) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
