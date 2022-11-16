import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { unwatchFile } from 'fs';
import { Network, User } from 'src/app/shared/models/firebase.models';
import { v4 as uuidv4 } from 'uuid';
import * as FirebaseConstants from '../../shared/constants/firebase.constants';

@Injectable({
  providedIn: "root",
})
export class AuthService {
 
  userData: User; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    if (this.isLoggedIn) {
      const userStored: User = JSON.parse(localStorage.getItem("user"));
      if (userStored.network == Network.Local) {
        this.login(userStored);
      } else {        
        this.afAuth.authState.subscribe((user) => {
            this.login(user ? user : null);
        });
      }
    }
  }

  // returns true when user is looged
  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem("user")) !== null;
  }

  private login(user) {
    this.userData = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  private loginWithRedirection(user, network: Network) {
    console.log("You have been successfully logged in!");
    this.login(user);
    this.setUserData(user, network);
    this.router.navigate(["/n2f/input"]);
  }

  private logout() {
    this.userData = null;
    localStorage.removeItem("user");
  }

  private logoutWitRedirection() {
    console.log("You have been successfully logged out!");
    this.router.navigate(["/auth/sign-in"]);
    this.logout();
  }

  async isExistUserEmailNetwork( email: string, network: Network ): Promise<boolean> {
    const userCollection: AngularFirestoreCollection<User> =
      this.afs.collection(FirebaseConstants.COLLECTION_USERS, (ref) => ref
          .where(FirebaseConstants.FIELD_EMAIL, "==", email)
          .where(FirebaseConstants.FIELD_NETWORK, "==", network)
          .limit(1)
      );
    return await userCollection
      .get()
      .toPromise()
      .then((qs) => { return !qs.empty; })
      .catch(() => { return false; });
  }
 
  setUserData(user, network: Network) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      pwd: user.pwd ? user.pwd : null,
      network: network,
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${FirebaseConstants.COLLECTION_USERS}/${user.uid}`
    );
    return userRef.set(userData, {  merge: true });
  }

  // click on logout button
  onLogout() {
    this.afAuth.signOut().then((result) => {
      this.logoutWitRedirection();
    });
  }

  // create auth in Local network with email & pwd
  create_login_with_local(email: string, pwd: string) {
    const user: User = {
      uid: uuidv4(),
      email: email,
      pwd: pwd,
      network: Network.Local,
    };
    this.loginWithRedirection(user, Network.Local);
  }

  // auth with Local
  async login_with_local(email: string, pwd: string) : Promise<boolean> {
    const userCollection = this.afs.collection<User>(
      FirebaseConstants.COLLECTION_USERS, (ref) => ref
          .where(FirebaseConstants.FIELD_EMAIL, "==", email)
          .where(FirebaseConstants.FIELD_PWD, "==", pwd)
          .where(FirebaseConstants.FIELD_NETWORK, "==", Network.Local)
          .limit(1)
    );
     const users = await userCollection.get().toPromise()
      .then(qs=>{
        return qs.docs.map((doc: any) => doc.data())
      });
      // console.log('users => ', users );
      // console.log('users 0 => ', users[0] );
      const user = users[0];
      if (user) {
        this.loginWithRedirection(user, Network.Local);
        return true;
      } else {
        console.log("Error when login with user : ", user);
      }
      return false; 
  }

  // auth with Google
  login_with_google() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {     
        this.loginWithRedirection(result.user, Network.Google);
      });
  }

  // auth with Facebook
  login_with_facebook() {
    this.afAuth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {   
        this.loginWithRedirection(result.user, Network.Facebook);
      });
  }

}
