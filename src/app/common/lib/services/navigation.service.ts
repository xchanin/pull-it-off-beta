import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public ToggleNavigationChanged: Subject<boolean>;
  public ToggleNavigationVal: boolean;

  constructor() {
    this.ToggleNavigationChanged = new Subject();
    this.ToggleNavigationVal = false;
  }

  public ToggleNavigation(): void {
    this.ToggleNavigationVal = !this.ToggleNavigationVal;
    this.ToggleNavigationChanged.next(this.ToggleNavigationVal);
  }
}
