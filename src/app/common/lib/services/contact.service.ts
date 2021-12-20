import { ContactMessageModel } from './../models/contact-message.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { ContactModel } from '../models/contact.model';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

const BACKEND_URL = environment.AWS_API + '/email/';
@Injectable({
  providedIn: 'root'
})

export class ContactService {

  /**
   * Event that notfies listeners about contact message status
   */
  protected contactMessageStatusListener: Subject<ContactMessageModel>

  
  constructor(protected http: HttpClient) { 
    this.contactMessageStatusListener = new Subject<ContactMessageModel>();
  }

  /**
   * 
   * @returns returns Observable<boolean>, but if this is 
   * set as the return type, then this doesn't seem to work
   */
 public GetContactMessageStatusListener(): Observable<ContactMessageModel> {

  return this.contactMessageStatusListener.asObservable();
}

  /**
  * send contact form info to email
  * this uses emailjs and sendgrid
  * 
  * @param contact contact form values
  * @returns promise
  */
  public SendEmail(contact: ContactModel): void {
    this.http
      .post(BACKEND_URL, {
        name: contact.FullName,
        email: contact.Email,
        message: contact.Comment
      })
      .subscribe({
        /**
         * Creation was successful
         * 
         * @param n response
         */
        next: (n) => {
          this.contactMessageStatusListener.next({Failed: false, Message: 'Message sent!'});
          // this.router.navigate(['/']);
        },
        /**
         * Error when creating a new user
         * 
         * @param e error
         */
        error: (e) => {
          this.contactMessageStatusListener.next({Failed: true, Message: 'Message failed!'});
        },
        /**
         * On complete
         */
        complete: () => {
          console.info('SENDING CONTACT MESSAGE COMPLETE');
        }
      })
  }
}
