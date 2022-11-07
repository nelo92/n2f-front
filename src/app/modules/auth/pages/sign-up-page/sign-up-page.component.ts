import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    recaptcha: ['', Validators.required]
  });
  
  loading = false;
  submitted = false;

  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;

  theme: 'light' | 'dark' = 'light';
  size: 'compact' | 'normal' = 'normal';
  lang = 'en';
  type: 'image' | 'audio';


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
  
  handleSuccess(data) {
    console.log(data);
  }  
}
