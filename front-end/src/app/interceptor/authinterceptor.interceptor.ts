import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('token', token),
    });
    return next(clonedRequest);
  }

  return next(req);
};
