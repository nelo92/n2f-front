import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chart-page",
  templateUrl: "./chart-page.component.html",
})
export class ChartPageComponent implements OnInit {
  public lineChartType = "line";
  public lineChartLabels: any[] = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet"
  ];
  public lineChartData: any = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }          
        },
      ],
    },
  };
  public lineChartLegend = false;

  constructor() {}

  ngOnInit() {
    this.lineChartData = [
      {
        data: [3, 1, 4, 2, 5, 6, 2]
      },
    ];
  }
}
