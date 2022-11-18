import { Util } from './../../../../shared/utils/util';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDatepicker, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import moment, { Moment } from "moment";
import { Observable } from "rxjs";
import { AuthService } from "src/app/modules/auth/auth.service";
import { NotedefraisService } from "src/app/modules/notedefrais/services/notedefrais.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { MY_FORMATS_MM_YYYY } from "src/app/shared/modules/material.module";
import { environment } from "src/environments/environment";

const MESSAGE_DELETE = "Are you sure want to delete?";
const MESSAGE_DELETE_ALL = "Are you sure want to delete everything?";

@Component({
  selector: "app-view-page",
  templateUrl: "./view-page.component.html",
  styleUrls: ["./view-page.component.css"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_MM_YYYY }]
})
export class ViewPageComponent implements OnInit {
  date = new FormControl(moment());

  datas$: Observable<any[]>;
  datas: any[];

  total: number = 0;
  displayTotal = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private noteDeFraisService: NotedefraisService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDatas();
  }

  onChangeDate(e: MatDatepickerInputEvent<Date>) {
    this.loadDatas();
  }

  delete(data) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: MESSAGE_DELETE },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.action_delete(data);
      }
    });
  }

  action_delete(data) {
    this.noteDeFraisService.delete(data);
    this.loadDatas();
  }

  deleteAll() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: MESSAGE_DELETE_ALL },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.action_deleteAll();
      }
    });
  }

  action_deleteAll() {
    this.datas.forEach((data) => this.noteDeFraisService.delete(data));
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

  chosenMonthHandler( normalizedMonth: Moment, datepicker: MatDatepicker<Moment> ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.loadDatas();
  }

  loadDatas() {
    const value = this.date.value;
    if (value) {
      const user = this.authService.userData;
      this.datas$ = this.noteDeFraisService.get(new Date(value), user.uid);
      this.datas$.subscribe((datas) => {
        this.datas = datas;
        this.countTotal(this.datas);
      });
    }
  }

  countTotal(datas: any[]) {
    this.total = 0;
    this.displayTotal = false;
    datas.forEach((data) => {
      this.total += Util.stringToNumber(data.amount);
      this.displayTotal = true;
    });
    this.total = Util.stringToNumber(this.total);
  }

}