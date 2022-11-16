import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import {
  MatDatepicker,
  MatDatepickerInputEvent
} from "@angular/material/datepicker";
import { Moment } from "moment";
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NotedefraisService } from "src/app/modules/notedefrais/services/notedefrais.service";
import { DataId } from 'src/app/shared/models/firebase.models';
import {
  moment,
  MY_FORMATS_YYYY
} from "src/app/shared/modules/material.module";
import { Util } from "src/app/shared/utils/util";

@Component({
  selector: "app-chart-page",
  templateUrl: "./chart-page.component.html",
  styleUrls: ["./chart-page.component.css"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_YYYY }]
})
export class ChartPageComponent implements OnInit {
  totals: number[];
  totals_test: number[] = [3, 1, 4, 2, 5, 6, 2];

  date = new FormControl(moment());

  public lineChartType = "line";
  public lineChartLabels: any[] = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  public lineChartData: any = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  public lineChartLegend = false;

  constructor(
    private fb: FormBuilder,
    private notedefraisService: NotedefraisService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDatas();
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.loadDatas();
  }

  onChangeDate(e: MatDatepickerInputEvent<Date>) {
    this.loadDatas();
  }

  loadDatas() {
    let v = this.date.value;
    if (v != null) {
      const user = this.authService.userData;
      // Solution 1 : load data by year
      this.notedefraisService
        .getByYear(new Date(v), user.uid)
        .subscribe((datas) => {
          this.totals = this.getTotals(datas);
          this.createLineChartData(this.totals);
          // console.log("Totals=>", this.totals);
        });
        // Solution 2 : load data by each month on year
        // ...
    }
  }
  
  createLineChartData(data: number[]){
    this.lineChartData = [
      {
        data: data,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        // fill: false,
      },
    ];
  }

  /* create table with amount by mounth */
  getTotals(datas: DataId[]) {
    let nbMonth = 12;
    let results: any[] = new Array(nbMonth);
    for (let month = 0; month <= (nbMonth-1); month++) {
      let result = datas
        .filter((data) => data.date.toDate().getMonth() == month)
        .map((data) => Util.stringToNumber(data.amount))
        .reduce((sum, current) => sum + current, 0);
      results[month] = result;
    }
    return results;
  }
  private printDate(d: Date) {
    let date = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    return date + "/" + month + "/" + year;
  }
 
}