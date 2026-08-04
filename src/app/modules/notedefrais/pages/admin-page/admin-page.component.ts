import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/auth/auth.service";
import { UserId } from "src/app/shared/models/firebase.models";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ["email", "lastConnection"];
  dataSource = new MatTableDataSource<UserId>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private usersSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.dataSource.sortingDataAccessor = (user: UserId, property: string) => {
      switch (property) {
        case "lastConnection":
          return user.lastConnection ? user.lastConnection.toMillis() : 0;
        default:
          return user[property];
      }
    };
  }

  ngOnInit() {
    this.usersSubscription = this.authService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
  }

}
