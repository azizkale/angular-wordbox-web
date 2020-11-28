import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
  ) { }

  register(email, password) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['/app-home']);
      })
      .catch(error => {
        alert(error);
      });
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail).then(
      response => {
        alert('mailinizi kontrol ediniz')
      }
    ).catch(error => {
      alert("Girdiğiniz bilgiler kayıtlı değildir.")
    });
  }

}
