import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('http inceptor called.');
      const cloned = request.clone({
          headers: request.headers.set("Authorization",
              "Bearer " + token)
      });
      console.log('HTTP INTERCEPTOR CALLED');
      return next.handle(cloned);
  }
  else {
      return next.handle(request);
  }
  }
}
