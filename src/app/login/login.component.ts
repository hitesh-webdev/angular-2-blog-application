import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentials: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    console.log(form);
    if (this.authService.onLogin(form.value.email, form.value.password)) {
      this.invalidCredentials = false;
      this.router.navigate(['/']);
    } else {
      this.invalidCredentials = true;
    }
  }

}
