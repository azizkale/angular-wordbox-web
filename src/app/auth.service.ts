import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { User } from "./models/user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private angularFireAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  // Firebase SignInWithPopup
  OAuthProvider(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['app-home']);
        })
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Firebase Google Sign-in
  SigninWithGoogle() {
    return this.OAuthProvider(new firebase.auth.GoogleAuthProvider())
      .then(res => {
      }).catch(error => {
        console.log(error)
      });
  }

  // Firebase Logout 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['authentication']);
    })
  }




}
