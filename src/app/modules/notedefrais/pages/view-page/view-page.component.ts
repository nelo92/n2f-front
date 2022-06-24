import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { NotedefraisService } from 'src/app/modules/notedefrais/services/notedefrais.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MY_FORMATS_MM_YYYY } from 'src/app/shared/modules/material.module';
import moment from 'moment';

const MESSAGE_DELETE = "Are you sure want to delete?";
const MESSAGE_DELETE_ALL = "Are you sure want to delete everything?";

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_MM_YYYY },
  ],
})
export class ViewPageComponent implements OnInit {

  date = new FormControl(moment());

  datas$: Observable<any[]>;
  datas: any[];

  total: number = 0;
  displayTotal = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private ndfService: NotedefraisService,
    private authService: AuthService,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.loadDatas();
  }

  onChangeDate(e: MatDatepickerInputEvent<Date>) {
    this.loadDatas();
  }

  delete(data) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: MESSAGE_DELETE }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.action_delete(data);
      }
    });
  }
  action_delete(data) {
    this.ndfService.delete(data);
    this.loadDatas();
  }

  deleteAll() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: MESSAGE_DELETE_ALL }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.action_deleteAll();
      }
    });
  }

  action_deleteAll() {
    this.datas.forEach(data => this.ndfService.delete(data));
    this.loadDatas();
  }

  onExport() {
    const user = this.authService.userData;
    let v = this.date.value;
    let d = new Date(v);
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    const URL = `${environment.urlExport}/${user.uid}/${year}/${month}`;
    window.open(URL, "_blank");
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.loadDatas();
  }

  loadDatas() {
    const user = this.authService.userData;
    let v = this.date.value;
    if (v != null) {
      this.datas$ = this.ndfService.get(new Date(v), user.uid);
      this.datas$.subscribe(datas => {
        this.datas = datas;
        this.countTotal(this.datas);
      });
    }
  }

  countTotal(datas: any[]) {
    this.total = 0;
    this.displayTotal = false;
    datas.forEach((data) => {
      this.total += parseFloat(data.amount);
      this.displayTotal = true;
    });
    this.total = parseFloat(this.numberFormat(this.total, 2));
  }

  numberFormat(val, dec) {
    var multiplier = Math.pow(10, dec);
    return (Math.round(val * multiplier) / multiplier).toFixed(dec);
  }

}
