import { AuthDataModel } from './../models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

const BACKEND_URL = environment.AWS_API + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Event that notfies listeners about the auth status
   */
  protected authStatusListener: Subject<boolean>

  /**
   * If user is authenticated - logged in
   */
  protected isAuthenticated: boolean;

  /**
   * Auth token
   */
  protected token: string;

  /**
   * Timer to auto expire token
   */
  protected tokenTimer: NodeJS.Timer;

  /**
   * Current user id
   */
  protected userId: string;

  constructor(
    protected http:HttpClient, 
    protected router: Router) { 

    this.authStatusListener = new Subject<boolean>();
  }

  /**
   * Get current token
   * 
   * @returns token
   */
  public GetToken(): string {

    return this.token;
  }

  /**
   * Get current userid
   * 
   * @returns user id as a string
   */
  public GetUserId(): string {

    return this.userId;
  }

  /**
   * 
   * @returns returns Observable<boolean>, but if this is 
   * set as the return type, then this doesn't seem to work
   */
  public GetAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  /**
   * Create a new user
   * 
   * @param email new user email
   * @param password new user password
   */
  public CreateUser(email: string, password: string): void {

    const authData: AuthDataModel = { email: email, password: password };

    /**
     * Call backend API to signup
     */
    this.http
      .post(BACKEND_URL + "signup", authData)
      .subscribe({
        /**
         * Creation was successful
         * 
         * @param n response
         */
        next: (n) => {
          this.router.navigate(['/']);
        },
        /**
         * Error when creating a new user
         * 
         * @param e error
         */
        error: (e) => {
          this.authStatusListener.next(false);
        },
        /**
         * On complete
         */
        complete: () => {
          console.info('Create User is completed');
        }
      });
  }

  /**
   * If user is authenticated or not
   * 
   * @returns boolean
   */
  public GetIsAuth(): boolean {

    return this.isAuthenticated;
  }

  /**
   * User login
   * 
   * @param email user email
   * @param password user password
   */
  public Login(email: string, password: string): void {

    const authData: AuthDataModel = { email: email, password: password };
    debugger;
    this.http
    .post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login', authData)
    .subscribe({
      next: (response) => {
        const token: string = response.token;
          this.token = token;

          if (token) {
            const expiresInDuration: number = response.expiresIn;

            this.setAuthTimer(expiresInDuration);

            this.userId = response.userId;

            const now: Date = new Date();
            const expirationDate: Date = new Date(now.getTime() + expiresInDuration * 1000);

            this.saveAuthData(token, expirationDate, this.userId);
            this.isAuth(true);
          }
      },
      error: (e) => {
        this.authStatusListener.next(false);
      },
      complete: () => console.info('Login complete')
    })
    
    // .subscribe(response => {
  
    //   const token: string = response.token;
    //   this.token = token;

    //   if (token) {
    //     const expiresInDuration: number = response.expiresIn;

    //     this.setAuthTimer(expiresInDuration);

    //     this.userId = response.userId;

    //     const now: Date = new Date();
    //     const expirationDate: Date = new Date(now.getTime() + expiresInDuration * 1000);
  
    //     this.saveAuthData(token, expirationDate, this.userId);
    //     this.isAuth(true);
    //   }
    // });
  }

  /**
   * User logout
   */
  public Logout(): void {
    this.token = null;
    this.isAuth(false);
    this.userId = null;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  /**
   * Auto authenticate user - use for checking
   * authentication when a component loads
   */
  public AutoAuthUser(): void {

    const authInformation: { token: string, expirationDate: Date, userId: string } = this.getAuthData();

    if (!authInformation) {
      return;
    }

    const now: Date = new Date();
    const expiresIn: number = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  /**
   * Time for when the token will expire
   * 
   * @param duration expiration of token
   */
  protected setAuthTimer(duration: number): void {
    
      /**
       * Auto logout when timer completes
       */
      this.tokenTimer = setTimeout(() => {
      this.Logout();
    }, duration * 1000);
  }

  /**
   * Set if user is logged in or not
   * 
   * @param authed true / false
   */
  protected isAuth(authed: boolean): void {

    this.isAuthenticated = authed;
    this.authStatusListener.next(authed);

    /**
     * Navigate back to home page
     */
    this.router.navigate(['/']);
  }

  /**
   * Store values in local storage, so they 
   * survive a page refresh, etc.
   * 
   * @param token auth token
   * @param expirationDate expiration date
   */
  protected saveAuthData(token: string, expirationDate: Date, userId: string): void {

    localStorage.setItem('token', token);

    /**
     * toISOString() - serialized / standardized version of the date 
     */
    localStorage.setItem('expiration', expirationDate.toISOString());

    /**
     * Save user id
     */
    localStorage.setItem('userId', userId);
  }

  /**
   * Clear local storage
   */
  protected clearAuthData(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  protected getAuthData(): { token: string, expirationDate: Date, userId: string } | null {

    const token: string = localStorage.getItem('token');
    const exiprationDate: string = localStorage.getItem('expiration');
    const userId: string = localStorage.getItem('userId');

    if (!token || !exiprationDate) {
      return null;
    }

    return {
      token: token,
      expirationDate: new Date(exiprationDate),
      userId: userId
    }
  }
}
