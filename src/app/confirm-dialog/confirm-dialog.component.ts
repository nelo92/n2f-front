import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export const YES = "YES";
export const NO = "NO";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  message: string = "Are you sure?"

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if(data){
      this.message = data.message || this.message;
    }
  }

}