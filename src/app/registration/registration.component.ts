import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

const CreateUser = gql`
  mutation createUser($token: String!) {
    createUser(token: $token) {
      email
      username
      userId
    }
  }
`;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  repassword: string;
  alert: boolean = false;
  alertMeassage: string;

  constructor(
    private registrationService: RegistrationService,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(email, password, repassword) {
    if (password === repassword) {
      this.registrationService
        .register(email, password)
        .then((res) => {
          this.router.navigate(['/app-home']);
        })
        .catch((error) => {
          this.alert = true;
          console.log(error);
          this.alertMeassage = error.message;
        });

      this.apollo
        .mutate({
          mutation: CreateUser,
          variables: {
            token: localStorage.getItem('user'),
          },
        })
        .subscribe((data) => {});
    } else {
      this.alert = true;
      this.alertMeassage = 'Şifre doğrulama hatası';
    }
  }
}
