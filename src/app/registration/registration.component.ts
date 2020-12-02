import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  repassword: string;
  constructor(private registrationService: RegistrationService, private apollo: Apollo) {}

  ngOnInit(): void {}

  register(email, password, repassword): void {
    const username = email.match(/^([^@]*)@/)[1];
    if (password === repassword) {
      this.registrationService.register(email, password);
      this.apollo
        .mutate({
          mutation: gql`
            mutation createUser($email: String!, $username: String!) {
              createUser(email: $email, username: $username) {
                email
                username
              }
            }
          `,
          variables: {
            email: email,
            username: username,
          },
        })
        .subscribe((data) => {});
    } else {
      alert('Şifreniz eşleşmiyor');
    }
  }
}
