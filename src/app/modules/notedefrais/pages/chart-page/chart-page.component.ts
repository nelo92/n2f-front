import { MAT_DATE_FORMATS } from "@angular/material/core";
import {
  moment,
  MY_FORMATS_MM_YYYY,
} from "src/app/shared/modules/material.module";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FormBuilder, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Moment } from "moment";

@Component({
  selector: "app-chart-page",
  templateUrl: "./chart-page.component.html",
  styleUrls: ["./chart-page.component.css"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_MM_YYYY }],
})
export class ChartPageComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.lineChartData = [
      {
        data: [3, 1, 4, 2, 5, 6, 2],
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        // fill: false,
      },
    ];
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.loadDatas();
  }

  onChangeDate(e: MatDatepickerInputEvent<Date>) {
    this.loadDatas();
  }

  loadDatas() {}
}
