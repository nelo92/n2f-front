import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
//import { map, tap } from 'rxjs/operators';
//import { formatDate } from "@angular/common";

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
//import { MatDialog } from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { NotedefraisService } from "../notedefrais.service"
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";

import { MY_FORMATS_MM_YYYY, moment } from "../../material.module";
import {Moment} from "moment";

const MESSAGE_DELETE = "Are you sure want to delete?";
const MESSAGE_DELETE_ALL = "Are you sure want to delete everything?";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_MM_YYYY},
  ],
})
export class ViewComponent implements OnInit {
  
  date = new FormControl(moment());
  datas: Observable<any[]>;
  total = 0;

  constructor (public dialog: MatDialog, private fb: FormBuilder, private ndfService:NotedefraisService) {     
  }

  ngOnInit() {
    this.loadDatas(); 
  }

  onChangeDate(e: MatDatepickerInputEvent<Date>) {
     this.loadDatas();   
  }

  delete(data){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {            
     data:{ message: MESSAGE_DELETE }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
        this.action_delete(data);
      }
    });
  }
  action_delete(data){ 
    this.ndfService.delete(data);
    this.countTotal();
  }

  deleteAll(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {            
     data:{ message: MESSAGE_DELETE_ALL }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
        this.action_deleteAll();
      }
    });
  }

  action_deleteAll(){
    this.datas.forEach((datas) => datas.map(data =>{       
      this.ndfService.delete(data);      
    }));
     this.countTotal();
  }

  onExport() {
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
    var v = this.date.value;
    if (v != null) {      
      this.datas = this.ndfService.get(new Date(v));
    }
   this.countTotal();
  }

  countTotal(){
    this.total = 0;
    this.datas.forEach((datas) => datas.map(data =>{       
        this.total += parseFloat(data.amount);
    }));
  }
 
}
