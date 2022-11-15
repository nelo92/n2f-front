import * as FirebaseConstants from '../../shared/constants/firebase.constants';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { User, Network } from 'src/app/shared/models/firebase.models';
import { v4 as uuidv4 } from 'uuid';
import { DH_CHECK_P_NOT_PRIME } from 'constants';

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
    });
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

  async isExistUserEmailNetwork(email: string, network: Network) : Promise<boolean>{
    const dataCollection: AngularFirestoreCollection<any> = this.afs.collection(
      FirebaseConstants.COLLECTION_USERS, (ref) => ref
        .where(FirebaseConstants.FIELD_EMAIL, "==", email)        
        .where(FirebaseConstants.FIELD_NETWORK, "==", network)
        );
      return await dataCollection.get().toPromise()
        .then((doc) => { return !doc.empty; })
        .catch(() => { return false; });
  }

  private async isExistUserEmailPwd(email: string, pwd: string) {
    const dataCollection: AngularFirestoreCollection<any> = this.afs.collection(
      FirebaseConstants.COLLECTION_USERS, (ref) => ref
        .where(FirebaseConstants.FIELD_EMAIL, "==", email)        
        .where(FirebaseConstants.FIELD_PWD, "==", pwd)
        .where(FirebaseConstants.FIELD_NETWORK, "==", Network.Local)
        );
      return await dataCollection.get().toPromise()
        .then((doc) => { 
        
          return !doc.empty; 
        })
        .catch((error) => { return false; });
  }


  // async testIsExistUserData(user) {

  //   console.log('>>>  ', user , '/', JSON.stringify(user));
  //   console.log('testIsExistUserData with user:', JSON.stringify(user));

  //   const userRef: AngularFirestoreDocument<any> = 
  //     this.afs.doc(`${FirebaseConstants.COLLECTION_USERS}/${user.uid}`);
  //   // // Control is documentdata exist
  //   // return userRef.get().subscribe(item => {
  //   //   return item; 
  //   //   // If you prefer including itemId back to object
  //   //   // return {...item, id: docId}
  //   // });

  //   // userRef.get().toPromise()
  //   // .then(doc => {
  //   //   if (doc.exists) {
  //   //     console.log(doc.data());
  //   //   } else {
  //   //     console.log("There is no document!");
  //   //   }
  //   // })
  //   // .catch(error => {
  //   //   console.log("There was an error getting your document:", error);
  //   // });

  //   return await userRef.get().toPromise()
  //     .then((doc) => {
  //       console.log('useruid=', user.uid ,'is exist =' + doc.exists);
  //       return doc.exists;
  //     })
  //     .catch((error) => {
  //       return false;
  //     });

  // }

  setUserData(user, network: Network) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      pwd: (user.pwd) ? user.pwd : null,
      network: network  
    }    
    const userRef: AngularFirestoreDocument<any> = 
      this.afs.doc(`${FirebaseConstants.COLLECTION_USERS}/${user.uid}`);
    return userRef.set(userData, {
      merge: true,
    });
  }

  // click on logout button
  onLogout() {    
    this.logout_with_google();
    // TODO : call logout by network
  }

  // ------------------------------------------------------
  // auth with Local : email & pwd

  // create_login_with_local(user: User){        
  //   console.log('create_login_with_local');   
  //   this.login(user);
  //   console.log('Create user = ' + JSON.stringify(user));    
  //   this.setUserData(user, Network.Local);        
  //   this.router.navigate(["/n2f/input"]);      
  // }

  create_login_with_local(email: string, pwd: string){        
    console.log('Call create_login_with_local');   
    const user: User = {
      uid: uuidv4(), 
      email: email,
      pwd: pwd,
      network: Network.Local,
    };    
    console.log('Create user = ' + JSON.stringify(user));    
    this.login(user);
    this.setUserData(user, Network.Local);        
    this.router.navigate(["/n2f/input"]);      
  }

  login_with_local(email: string, pwd: string){    
    console.log('Call login_with_local');
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${FirebaseConstants.COLLECTION_USERS}/${user.uid}`);
    
    
    // TODO  

    this.isExistUserEmailPwd(email, pwd)
      .then(()=>{

        console.log('Exist login_with_local'); 
      })
      .catch((error)=>{ console.log('Erreur ', error); });

  }

  // logout_with_Local() { 
  //   console.log('logout_with_Local');
  // }

  // ------------------------------------------------------
  // auth with Google

  login_with_google() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        this.ngZone.run(() => {
          console.log('You have been successfully logged in!')
        })
        this.login(result.user);
        this.setUserData(result.user, Network.Google);
        this.router.navigate(["/n2f/input"]);
      });
  }

  logout_with_google() {
    this.afAuth.signOut().then((result) => {
      console.log('You have been successfully logged out!')
      this.router.navigate(["/auth/sign-in"]);
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
        this.setUserData(result.user, Network.Facebook);
        this.router.navigate(["/n2f/input"]);
      });
  }

  logout_with_facebook() {
    // TODO: missing implementation
  }

}
