import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string;
  password: string;
  repassword: string;
  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
  }

  register(email, password, repassword) {
    if(password === repassword){
      this.registrationService.register(email, password);
    }
    else{
      alert('şifreniz eşleşmiyor')
    }
  } 
}
