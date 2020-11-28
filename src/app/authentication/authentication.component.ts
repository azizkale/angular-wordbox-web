import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { RegistrationService } from '../registration.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
  }

  SignInWithGoole() {
    this.authService.SigninWithGoogle()
  }

  SignInwithEmail(email, password) {
    this.authService.SignInWithEmail(email, password);
  }

  resetPassword(email) {
    this.registrationService.sendPasswordResetEmail(email);
  }

  chechAythState() {
    console.log(localStorage.getItem('user')
    )
  }
}
