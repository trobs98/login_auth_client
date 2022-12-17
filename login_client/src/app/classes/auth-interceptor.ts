import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.status === 0) {
                        console.error('This is a client side error.');
                        errorMessage = `Error: ${error.error.message}`;
                    }
                    else {
                        console.error('This is a server side error.');
                        errorMessage = `Error Code: ${error.status}`
                    }

                    console.error(errorMessage);
                    return throwError(() => Error(errorMessage));
                })
            );
    }
}
