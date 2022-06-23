import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["input"]);
    }
  }

}
