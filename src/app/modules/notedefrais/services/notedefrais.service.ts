import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as FirebaseConstants from 'src/app//shared/constants/firebase.constants';
import { Data, DataId } from 'src/app/shared/models/firebase.models';

@Injectable()
export class NotedefraisService {
  
  private dataCollection: AngularFirestoreCollection<Data>;
  datas$: Observable<DataId[]>;

  constructor(private afs: AngularFirestore) {}

  private printDate(d: Date) {
    let date = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    return date + "/" + month + "/" + year;
  }

  public get(date: Date, user_uid: string): Observable<DataId[]> {
    // console.log("get: date=", date, "user_uid=", user_uid);
    let dateStart = this.getMonthDateStart(date);
    let dateEnd = this.getMonthDateEnd(date);
    return this.getDatas(user_uid, dateStart, dateEnd);
  }

  public getByYear(date: Date, user_uid: string): Observable<DataId[]> {
    // console.log("getByYear: date=", date, "user_uid=", user_uid);
    let dateStart = this.getYearDateStart(date);
    let dateEnd = this.getYearDateEnd(date);
    return this.getDatas(user_uid, dateStart, dateEnd);
  }

  private getDatas( user_uid: string, dateStart: Date, dateEnd: Date ): Observable<DataId[]> {
    // console.log("start=", this.printDate(dateStart));
    // console.log("end=", this.printDate(dateEnd));
    this.dataCollection = this.afs
      .doc(`${FirebaseConstants.COLLECTION_USERS}/${user_uid}`)
      .collection(FirebaseConstants.COLLECTION_DATAS, (ref) => ref
          .where(FirebaseConstants.FIELD_DATE, ">=", dateStart)
          .where(FirebaseConstants.FIELD_DATE, "<", dateEnd)
          .orderBy(FirebaseConstants.FIELD_DATE, "asc")
      );
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

  public add(data: Data) {
    this.dataCollection = this.afs
      .doc(`${FirebaseConstants.COLLECTION_USERS}/${data.user_uid}`)
      .collection(FirebaseConstants.COLLECTION_DATAS);
    this.dataCollection
      .add(data)
      .then(doc => console.log("Document written with ID: ", doc.id))
      .catch( error =>  console.error("Error adding document: ", error));
  }

  public delete(data: DataId) {
    this.dataCollection
      .doc(data.id)
      .delete()
      .then( () => console.log("Document successfully deleted!"))
      .catch(error => console.error("Error removing document: ", error));
  }

  /** get first day of current month and year */
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

  /** get first day of next current month in same year */
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

  /** get first day and first month of current year date */
  private getYearDateStart(date: Date): Date {
    var d = new Date(),
      year = date.getFullYear();
    d.setDate(1);
    d.setMonth(0);
    d.setFullYear(year);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /** get first day and first month of next current year date */
  private getYearDateEnd(date: Date): Date {
    var d = new Date(),
    year = date.getFullYear();
    d.setDate(1);
    d.setMonth(0);
    d.setFullYear(year+1);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  
}