import { ContactMessageModel } from './../../models/contact-message.model';
import { ContactModel } from './../../models/contact.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, ValidationMessageModel, ValidationMessages } from '@lcu/common';
import { EmailJSResponseStatus } from 'emailjs-com';
import { ContactService } from '../../services/contact.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'pio-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  /**
     * Event that notfies listeners about the auth status
     */
  protected contactMessageListenerSubscription: Subscription;

  /**
   * Access comment name field
   */
  public get CommentControl(): AbstractControl {
    return this.Form.get('CommentControl');
  }

  /**
   * Access email field
   */
  public get EmailControl(): AbstractControl {
    return this.Form.get('EmailControl');
  }

  /**
   * property for reactive form
   */
  public Form: FormGroup;

  /**
   * Access full name field
   */
  public get FullNameControl(): AbstractControl {
    return this.Form.get('FullNameControl');
  }

  public IsLoading: boolean;

  public MessageSent: boolean;

  public Sending: boolean;

  /**
   * Contact message post error
   */
  public SendError: boolean;

  /**
   * Email validation
   */
   public VMEmail: Array<ValidationMessageModel>;

  constructor(
    protected contactService: ContactService) {

    this.VMEmail = ValidationMessages.Email;
   }

  ngOnInit(): void {

    this.contactMessageListenerSubscription = this.contactService
    .GetContactMessageStatusListener()
    .subscribe(
      (status: ContactMessageModel) => {
       this.IsLoading = false;

       if (!status.Failed) {
         this.ClearForm();
         this.MessageSent = true;
       } else {
        this.SendError = false;
       }
      }
    )

    this.setupForm();
  }

  /**
   * Send contact message
   */
  public Send(): void {

    this.IsLoading = true;
    this.contactService.SendEmail(
      {
        Email: this.EmailControl.value,
        FullName: this.FullNameControl.value,
        Comment: this.CommentControl.value
      }
    )
  }
  
 
  /**
   * clear form values
   */
  public ClearForm(): void {

    this.Form.reset();
  }

  /**
   * setup contact form
   */
  protected setupForm(): void {

    this.Form = new FormGroup({
      EmailControl: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.pattern(EmailValidator.EmailPatternDomain)
        ])),
      FullNameControl: new FormControl('', Validators.compose([Validators.required])),
      CommentControl: new FormControl('', Validators.compose([Validators.required]))
    });

    this.onChanges();
  }

  /**
   * Listen for form changes
   */
  protected onChanges(): void {

    this.Form.valueChanges.subscribe((val: ContactModel) => {

    });
  }

  /**
   * Check if form has changes, if so warn the user
   */
   public CanDeactivate(): boolean {
    return !this.Form.dirty && !this.Form.touched;
  }

}
