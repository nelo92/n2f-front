import { AuthService } from 'src/app/modules/auth/auth.service';

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-network",
  templateUrl: "./login-network.component.html",
})
export class LoginNetworkComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit() {}
}
