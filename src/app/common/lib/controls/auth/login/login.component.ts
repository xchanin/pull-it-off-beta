import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

/**
   * Event that notfies listeners about the auth status
   */
 protected authListenerSubscription: Subscription;


  public IsLoading: boolean;

  constructor(protected authService: AuthService) {

    this.IsLoading = false;
   }

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

  public Login(form: NgForm) {
    
    if (form.invalid) {
      return;
    }

    this.IsLoading = true;
    this.authService.Login(form.value.email, form.value.password);
  }

}
