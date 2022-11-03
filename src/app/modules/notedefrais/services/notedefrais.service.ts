import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as FirebaseConstants from '../../../shared/constants/firebase.constants';

export interface Data { user_uid: string; date: Date; amount: string; }
export interface DataId extends Data { id: string; }

@Injectable()
export class NotedefraisService {
  
  private dataCollection: AngularFirestoreCollection<Data>;
  datas$: Observable<DataId[]>;

  constructor(
    private afs: AngularFirestore
  ) {}

  // logDate(d) {
  //   let date = ("0" + d.getDate()).slice(-2);
  //   let month = ("0" + (d.getMonth() + 1)).slice(-2);
  //   let year = d.getFullYear();
  //   console.log(" date ->", d);
  //   return date + "/" + month + "/" + year;
  // }

  // get(date, user_uid): Observable<DataId[]> {
  //   console.log("get : date=", date, "user_uid=", user_uid);
  //   let dateStart = this.getMonthDateStart(date);
  //   let dateEnd = this.getMonthDateEnd(date);
  //   this.dataCollection = this.afs.collection<Data>(FirebaseConstants.COLLECTION_DATAS,
  //     ref => ref
  //       .where(FirebaseConstants.FIELD_DATE, ">=", dateStart)
  //       .where(FirebaseConstants.FIELD_DATE, "<", dateEnd)
  //       .orderBy(FirebaseConstants.FIELD_DATE, "asc")
  //   )
  //   // console.log("filter.start=", this.logDate(dateStart));
  //   // console.log("filter.end=", this.logDate(dateEnd));
  //   this.datas$ = this.dataCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Data;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  //   return this.datas$;
  // }
  // add(data: Data) {
  //   this.dataCollection = this.afs.collection<Data>(FirebaseConstants.COLLECTION_DATAS);
  //   this.dataCollection.add(data)
  //     .then(function (doc) {
  //       console.log("Document written with ID: ", doc.id);
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     })
  // }

  public get(date, user_uid): Observable<DataId[]> {
    // console.log("get : date=", date, "user_uid=", user_uid);
    let dateStart = this.getMonthDateStart(date);
    let dateEnd = this.getMonthDateEnd(date);
    this.dataCollection = this.afs
      .doc(`${FirebaseConstants.COLLECTION_USERS}/${user_uid}`)
      .collection(FirebaseConstants.COLLECTION_DATAS, (ref) =>
        ref
          .where(FirebaseConstants.FIELD_DATE, ">=", dateStart)
          .where(FirebaseConstants.FIELD_DATE, "<", dateEnd)
          .orderBy(FirebaseConstants.FIELD_DATE, "asc")
      );
    // console.log("filter.start=", this.logDate(dateStart));
    // console.log("filter.end=", this.logDate(dateEnd));
    this.datas$ = this.dataCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Data;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.datas$;
  }

  public getByYear(date, user_uid): Observable<DataId[]> {
    console.log('getByYear...');
    return null;
  }

  public add(data: Data) {
    this.dataCollection = this.afs
      .doc(`${FirebaseConstants.COLLECTION_USERS}/${data.user_uid}`)
      .collection(FirebaseConstants.COLLECTION_DATAS);
    this.dataCollection
      .add(data)
      .then(function (doc) {
        console.log("Document written with ID: ", doc.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  public delete(data: DataId) {
    this.dataCollection
      .doc(data.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  private getMonthDateStart(date: Date): Date {
    var d = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();
    d.setDate(1);
    d.setMonth(month);
    d.setFullYear(year);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private getMonthDateEnd(date: Date): Date {
    var d = new Date(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
    if (month > 11) {
      month = 0;
      year = year + 1;
    }
    d.setDate(1);
    d.setMonth(month);
    d.setFullYear(year);
    d.setHours(0, 0, 0, 0);
    return d;
  }

}