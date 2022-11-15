import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { Network, User } from 'src/app/shared/models/firebase.models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import * as Constants from 'src/app/shared/constants';

export const MESSAGE_USER_EMAIL_ALREADY_EXIST = "User email already exist.";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  
  @ViewChild(MessageComponent) message: MessageComponent;

  // form
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  // captcha configuration
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Constants.REGEX_EMAIL)]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  get controls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;           
    const email = this.loginForm.controls.email.value;
    const pwd = this.loginForm.controls.password.value;
    this.authService.isExistUserEmailNetwork(email, Network.Local)
      .then((isExist) => {
        if (isExist) {
          this.message.show_error(MESSAGE_USER_EMAIL_ALREADY_EXIST);
        } else {          
          this.authService.create_login_with_local(email, pwd);
        }
      })
      .finally((()=> this.loading = false ));
  }

}
