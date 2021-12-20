import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'pio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  protected authListenerSubscription: Subscription;
  public UserIsAuthenticated: boolean;

  constructor(
    protected navigationService: NavigationService,
    protected authService: AuthService) { }

  public ngOnInit(): void {

    /**
     * On load, check user authentication
     */
    this.UserIsAuthenticated = this.authService.GetIsAuth();

    /**
     * Listen for user authentication changes
     */
    this.authListenerSubscription = this.authService
      .GetAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.UserIsAuthenticated = isAuthenticated;
      })
  }

  public ngOnDestroy(): void {
    this.authListenerSubscription.unsubscribe();
  }

  public ToggleNavigation(): void {
    this.navigationService.ToggleNavigation();
  }

  public Logout(): void {
    this.authService.Logout();
  }
}
