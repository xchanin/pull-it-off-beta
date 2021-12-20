import { HttpErrorComponent } from './common/lib/controls/errors/http-error/http-error.component';
import { AuthService } from './common/lib/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, UrlSegment } from '@angular/router';
import { onMainContentChange, RouteAnim } from './common/lib/animations/animations';
import { GenericModalService } from './common/lib/services/generic-modal.service';
import { GenericModalModel } from './common/lib/models/generic-modal.model';

@Component({
  selector: 'pio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RouteAnim]
})

export class AppComponent implements OnInit {

  public Title: string;

  constructor(
    protected authService: AuthService) {}

  public ngOnInit(): void {
    // this.Title = PullItOffUtils.upperPullItOff(this.Title);

    /**
     * Kick off the automatic authentication workflow
     */
    this.authService.AutoAuthUser();
  }

  public PrepareRoute(outlet: RouterOutlet): Array<UrlSegment> | null {

    /**
     * Get data from current route - data is set in
     * app-routing.module for each route
     */
    if (outlet.isActivated) {
      return outlet.activatedRouteData['tab'];
      // return outlet.activatedRoute.snapshot.url;
    } else {
      return null;
    }
  }

  public OnActivate(evt: Event): void {

  }
}
