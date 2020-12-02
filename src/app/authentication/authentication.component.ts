import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegistrationService } from '../registration.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private registrationService: RegistrationService) {}

  ngOnInit(): void {}

  SignInWithGoole(): void {
    this.authService.SigninWithGoogle();
  }

  SignInwithEmail(email, password): void {
    this.authService.SignInWithEmail(email, password);
  }

  resetPassword(email): void {
    this.registrationService.sendPasswordResetEmail(email);
  }

  chechAythState(): void {
    console.log(localStorage.getItem('user'));
    this.authService.AuthenticatedControlInServerSide().subscribe((data) => {
      console.log(data);
    });
  }
}
