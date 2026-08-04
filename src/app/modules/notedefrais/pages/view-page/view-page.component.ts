import { Util } from './../../../../shared/utils/util';
import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDatepicker, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
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
export class ViewPageComponent implements OnInit, AfterViewInit {
  date = new UntypedFormControl(moment(), Validators.required);

  displayedColumns: string[] = ["date", "amount", "actions"];
  dataSource = new MatTableDataSource<any>([]);

  datas$: Observable<any[]>;
  datas: any[];

  total: number = 0;
  displayTotal = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private noteDeFraisService: NotedefraisService,
    private authService: AuthService
  ) {
    this.dataSource.sortingDataAccessor = (data: any, property: string) => {
      switch (property) {
        case "date":
          return data.date ? data.date.toMillis() : 0;
        case "amount":
          return Util.stringToNumber(data.amount);
        default:
          return data[property];
      }
    };
  }

  ngOnInit() {
    this.loadDatas();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onChangeDate(e: MatDatepickerInputEvent<Date>) {
    if (!this.date.value) {
      this.date.setValue(moment());
    }
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
        this.dataSource.data = datas;
        if (this.paginator) {
          this.paginator.firstPage();
        }
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