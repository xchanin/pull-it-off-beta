import { NavigationService } from './../../services/navigation.service';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { gsap } from 'gsap';

// declare let gsap: any;
@Component({
  selector: 'pio-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public NavLinks: Array<{label: string, route: string}>;

  // tslint:disable-next-line:no-input-rename
  @Input('side-nav')
  public SideNav: MatSidenav;

  constructor(protected navigationService: NavigationService) { 

    /**
     * Listen for navigttion toggle changes
     */
    this.navigationService.ToggleNavigationChanged.subscribe((res: boolean) => {
      this.ToggleNav();
    });
  }

  ngOnInit(): void {
    this.navLinks();
  }

  public ToggleNav(toggle?: boolean): void {
 
    if (toggle === false) {
      this.navigationService.ToggleNavigationVal = toggle;
    }
   
    if (this.navigationService.ToggleNavigationVal) {
      gsap.to('.line1', { rotate: '45', y: 5, background: 'red', duration: 0.5 });
      gsap.to('.line2', { rotate: '-45', y: -5, background: 'red', duration: 0.5 });
      gsap.to('#logoImg', { 
        autoAlpha: 1,
        fill: 'purple',
        overwrite: true,
        duration: 1
      });
      gsap.to('.nav-bar', { clipPath: 'circle(3500px at 100% -10%)', opacity: '1', duration: 1 });
      document.body.classList.add('hide');

    } else {
      
      gsap.to('.line1', { rotate: '0', y: 0, background: 'white', duration: 0.5 });
      gsap.to('.line2', { rotate: '0', y: 0, background: 'white', duration: 0.5 });
      gsap.to('#logoIMg', { fill: 'white', duration: 1 });
      gsap.to('.nav-bar', { clipPath: 'circle(50px at 100% -10%)', opacity: '1', duration: 1 });
      document.body.classList.remove('hide');
    }

    // if (!e.target.classList.contains('active')) {
    //   e.target.classList.add('active');
    //   gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: 'black' });
    //   gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: 'black' });
    //   gsap.to('#logo', 1, { color: 'black' });
    //   gsap.to('.nav-bar', 1, { clipPath: 'circle(2500px at 100% -10%)' });
    //   document.body.classList.add('hide');
    // } else {
    //   e.target.classList.remove('active');
    //   gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: 'white' });
    //   gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: 'white' });
    //   gsap.to('#logo', 1, { color: 'white' });
    //   gsap.to('.nav-bar', 1, { clipPath: 'circle(50px at 100% -10%)' });
    //   document.body.classList.remove('hide');
    // }
  }

  protected navLinks(): void {
    this.NavLinks = [
      { label: 'Login', route: '/auth/login' },
      { label: 'Sign Up', route: '/auth/signup' },
      { label: 'Home', route: '/home' },
      { label: 'Events', route: '/events' },
      { label: 'Videos', route: '/videos' },
      { label: 'About', route: '/about' },
      { label: 'Posts', route: '/posts' },
      { label: 'Post Create', route: '/post-create' },
      { label: 'Post Edit', route: '/post-edit' }
    ]
  }

}
