import * as FirebaseConstants from '../constants/firebase.constants';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.login(user);
      } else {
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

  // ------------------------------------------------------

  private login(user) {
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  private logout() {
    this.userData = null;
    localStorage.removeItem('user');
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${FirebaseConstants.COLLECTION_USERS}/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // ------------------------------------------------------
  // auth with Login & Pwd
  // ...

  // ------------------------------------------------------
  // auth with Google

  login_with_google() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        this.ngZone.run(() => {
          console.log('You have been successfully logged in!')
        })
        this.login(result.user);
        this.setUserData(result.user);
        this.router.navigate(["input"]);
      });
  }

  logout_with_google() {
    this.afAuth.signOut().then((result) => {
      console.log('You have been successfully logged out!')
      this.router.navigate(["sign-in"]);
    });
    this.logout();
  }

  // ------------------------------------------------------
  // auth with Facebook
  login_with_facebook() {
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
        this.ngZone.run(() => {
          console.log('You have been successfully logged in!')
        })
        this.login(result.user);
        this.setUserData(result.user);
        this.router.navigate(["input"]);
      });
  }

}
