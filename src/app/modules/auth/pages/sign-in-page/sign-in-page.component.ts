import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Constants from 'src/app/shared/constants';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required, [Validators.required, Validators.pattern(Constants.REGEX_EMAIL)]],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/n2f/input"]);
    }  
  }

  get controls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.submitted = false;
  }

}
