import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
        this.login(user);
      } else {
        // localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
        this.login(null);
      }
    })
  }

  // ------------------------------------------------------

  // returns true when user is looged
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  private login(user) {
    localStorage.setItem('user', user);
    JSON.parse(localStorage.getItem('user'));
  }

  private logout() {
    localStorage.removeItem('user');
  }

  // ------------------------------------------------------
  // auth with Google

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        this.ngZone.run(() => {
          console.log('You have been successfully logged in!')
          console.log('user:', result.user);
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  logoutWithGoogle() {
    console.log('logoutWithGoogle...');
    this.afAuth.signOut().then((result) => {
      console.log('You have been successfully logged out!')
    }).catch((error) => {
      console.log(error)
    });
    this.logout();
  }

  // ------------------------------------------------------

  // googleAuth() {
  //   console.log("googleAuth");
  //   return this.authLogin(new auth.GoogleAuthProvider());
  // }

  // // Auth logic to run auth providers
  // authLogin(provider) {
  //   return this.afAuth.signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         console.log('You have been successfully logged in!')
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }

}
