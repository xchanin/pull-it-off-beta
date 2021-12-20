import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pio-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public  IsLoading = false;
  
  /**
   * Event that notfies listeners about the auth status
   */
   protected authListenerSubscription: Subscription;

  constructor(protected authService: AuthService) { }

  public ngOnInit(): void {

    this.authListenerSubscription = this.authService
    .GetAuthStatusListener()
    .subscribe(
      authStatus => {
        this.IsLoading = false;
      }
    )
  }

  public ngOnDestroy(): void {
    this.authListenerSubscription.unsubscribe();
  }

  /**
   * 
   * @param form User signup
   * @returns 
   */
  public OnSignup(form: NgForm): void {

    if (form.invalid) {
      return;
    }
    
    this.IsLoading = true;
    this.authService.CreateUser(form.value.email, form.value.password);
  }
}
