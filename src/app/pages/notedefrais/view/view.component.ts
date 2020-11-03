import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { moment, MY_FORMATS_MM_YYYY } from 'src/app/modules/material.module';
import { Moment } from 'moment';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { NotedefraisService } from 'src/app/services/notedefrais.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

const MESSAGE_DELETE = "Are you sure want to delete?";
const MESSAGE_DELETE_ALL = "Are you sure want to delete everything?";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_MM_YYYY },
  ],
})
export class ViewComponent implements OnInit {

  date = new FormControl(moment());

  datas$: Observable<any[]>;
  datas: any[];

  total = 0;
  displayTotal = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private ndfService: NotedefraisService,
    private authService: AuthService
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
    let v = this.date.value;
    let d = new Date(v);
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    const URL = `${environment.urlExport}/${year}/${month}`;
    console.log("Url export: " + URL);
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
    console.log("loadDatas user_uid= ", user.uid)
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
  }

}
