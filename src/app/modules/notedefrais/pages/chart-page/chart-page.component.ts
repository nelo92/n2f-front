import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDatepicker, MatDatepickerInputEvent, } from "@angular/material/datepicker";
import { Moment } from "moment";
import { NotedefraisService } from "src/app/modules/notedefrais/services/notedefrais.service";
import { moment, MY_FORMATS_YYYY, } from "src/app/shared/modules/material.module";
import { AuthService } from "./../../../auth/auth.service";

@Component({
  selector: "app-chart-page",
  templateUrl: "./chart-page.component.html",
  styleUrls: ["./chart-page.component.scss"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_YYYY }],
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

  constructor(
    private fb: FormBuilder,
    private notedefraisService: NotedefraisService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDatas();
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
    console.log("loadDatas...");
    let v = this.date.value;
    if (v != null) {
      const user = this.authService.userData;
      this.notedefraisService.getByYear(new Date(v), user.uid);
    }
    console.log("loadDatas.");
  }
  
}
