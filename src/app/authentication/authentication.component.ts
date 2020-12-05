import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegistrationService } from '../registration.service';
import { Apollo, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

const GetSingleUser = gql`
  query getSingleUser($token: String!) {
    getSingleUser(token: $token) {
      email
      userId
    }
  }
`;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  email: string;
  password: string;
  subs: Subscription;
  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {}

  SignInWithGoole(): void {
    // this.authService.SigninWithGoogle();
    this.apollo
      .watchQuery<any>({
        query: GetSingleUser,
        variables: {
          token: localStorage.getItem('user'),
        },
      })
      .valueChanges.subscribe((data) => {
        console.log(data);
      });
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
