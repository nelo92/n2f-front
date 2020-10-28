import * as FirebaseConstants from '../constants/firebase.constants';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Data { date: Date; amount: string; }
export interface DataId extends Data { id: string; }

@Injectable()
export class NotedefraisService {

  private dataCollection: AngularFirestoreCollection<Data>;
  datas$: Observable<DataId[]>;

  constructor(private afs: AngularFirestore) {
  }

  // logDate(d) {
  //   let date = ("0" + d.getDate()).slice(-2);
  //   let month = ("0" + (d.getMonth() + 1)).slice(-2);
  //   let year = d.getFullYear();
  //   console.log(" date ->", d);
  //   return date + "/" + month + "/" + year;
  // }

  get(date): Observable<DataId[]> {
    let dateStart = this.getDateStart(date);
    let dateEnd = this.getDateEnd(date);
    this.dataCollection = this.afs.collection<Data>(FirebaseConstants.COLLECTION_DATA,
      ref => ref.orderBy(FirebaseConstants.FIELD_DATE, "asc")
        .where(FirebaseConstants.FIELD_DATE, ">=", dateStart)
        .where(FirebaseConstants.FIELD_DATE, "<", dateEnd)
    );
    // console.log("filter.start=", this.logDate(dateStart));
    // console.log("filter.end=", this.logDate(dateEnd));

    this.datas$ = this.dataCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Data;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.datas$;
  }

  add(data) {
    this.dataCollection = this.afs.collection<Data>(FirebaseConstants.COLLECTION_DATA);
    this.dataCollection.add(data)
      .then(function (doc) {
        console.log("Document written with ID: ", doc.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });;
  }

  delete(data) {
    this.dataCollection.doc(data.id).delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  getDateStart(date: Date): Date {
    var d = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();
    d.setDate(1);
    d.setMonth(month);
    d.setFullYear(year);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  getDateEnd(date: Date): Date {
    var d = new Date(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
    if (month > 11) { month = 0; year = year + 1; }
    d.setDate(1);
    d.setMonth(month);
    d.setFullYear(year);
    d.setHours(0, 0, 0, 0);
    return d;
  }

}