
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('token', token),
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}