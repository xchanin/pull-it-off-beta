import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(protected authService: AuthService) {}

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

        const authToken: string = this.authService.GetToken();

        /**
         * Request that clones the token
         * 
         * Set an extra header to original header
         */
         console.log('INTERCEPTOR TOKEN', authToken);
        const authRequest = req.clone(
            {
                /**
                 * 'Bearer' - convention used for the backend
                 */
                headers: req.headers.set("Authorization", "Bearer " + authToken)
            }
        );

        return next.handle(authRequest);
    }
}