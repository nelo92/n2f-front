import { Network, User } from 'src/app/shared/models/firebase.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import * as Constants from 'src/app/shared/constants';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(Constants.REGEX_EMAIL)]],
    password: ['', Validators.required],
    recaptcha: ['', Validators.required]
  });
  
  loading = false;
  submitted = false;

  // captchaIsLoaded = false;
  // captchaSuccess = false;
  // captchaIsExpired = false;
  // captchaResponse?: string;

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
    console.log('submit')
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log('submit > valid')
    this.loading = true;
    this.submitted = false;
    
    // ...
    console.log('email='+this.loginForm.controls.email.value);
    console.log('password='+this.loginForm.controls.password.value);      
    const uid = 'test';
    const user: User = {
      uid: uid, 
      email: this.loginForm.controls.email.value,
      pwd: this.loginForm.controls.password.value,
      network: Network.Local,
    };
    this.authService.create_login_with_local(user);
    // ...
  }
  
  handleSuccess(data) {
    // console.log(data);
  }  
}
