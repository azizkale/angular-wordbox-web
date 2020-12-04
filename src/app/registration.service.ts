import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(public router: Router, public ngZone: NgZone, public afAuth: AngularFireAuth) {
    this.SetUserState();
  }

  user;
  SetUserState(): Observable<firebase.User> {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
    console.log(localStorage.getItem('user'));
    return this.user;
  }

  async register(email, password): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(passwordResetEmail: string): Promise<void> {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then((response) => {
        alert('mailinizi kontrol ediniz');
      })
      .catch((error) => {
        alert('Girdiğiniz bilgiler kayıtlı değildir.');
      });
  }
}
