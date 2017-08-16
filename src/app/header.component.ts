import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  userEmail: string;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.loginStatus.subscribe(
      (status) => {
        if (status) {
          this.userEmail = this.authService.userEmail;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.onLogout();
  }

}
