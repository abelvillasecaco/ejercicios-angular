import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(`[Interceptor] Saliendo petición hacia: ${req.url}`);

  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer token-secreto-angular-20',
      'X-Version': '2.0'
    }
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(`[Interceptor] Error detectado: ${err.status} - ${err.message}`);

      return throwError(() => err);
    })
  )

  return next(req);
};
