import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericModalService } from '../services/generic-modal.service';
import { GenericModalModel } from '../models/generic-modal.model';
import { HttpErrorComponent } from '../controls/errors/http-error/http-error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(protected genericModalService: GenericModalService<ErrorInterceptor>) {}

    /**
     * Function that will run on any outgoing HTTP request
     * Manipulate incoming request by adding our token
     * 
     * Can manipulate outgoing request to attach our token
     * 
     * @param req Request being intercepted
     * @param next A next handler
     * @returns Observable
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /**
         * Listen to response observable stream, so 
         * we can listen to events
         * 
         * Every outgoing HTTP request will have this 
         * interceptor attached to it
         */
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage: string = 'An unknown error occured!';
                debugger;
                if (error.error.message) {
                    errorMessage = error.error.message;
                }

                this.showHTTPErrors(errorMessage);
                return throwError(() => error);
            })
        );
    }

    /**
   * On any HTTP errors, show dialogue
   */
  protected showHTTPErrors(errMessage: string): void {

    const modalConfig: GenericModalModel = new GenericModalModel({
      ModalType: 'info',
      CallbackAction: (val: any) => {},
      Component: HttpErrorComponent,
      Data: {
        Title: 'HTTP Error',
        Message: errMessage
      },
      LabelCancel: 'Cancel',
      LabelAction: 'OK',
      Title: 'HTTP Error',
      Width: '50%'
    });

    this.genericModalService.Open(modalConfig);
  }
}