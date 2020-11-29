import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
  ) {
    this.SetUserState();
  }

  SetUserState(): void {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Firebase SignInWithPopup
  OAuthProvider(provider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['app-home']);
        });
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Firebase Google Sign-in
  SigninWithGoogle(): Promise<void> {
    return this.OAuthProvider(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.router.navigate(['app-home']);
      }).catch(error => {
        console.log(error);
      });
  }

  SignInWithEmail(email, password): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {       
          this.router.navigate(['app-home']);
      })
      .catch(() => {
        alert('Kullanıcı bilgilerinizi kontrol edip tekrar deneyiniz.');
      });
  }

  // Firebase Logout 
  SignOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      this.router.navigate(['authentication']);
    });
  }




}
