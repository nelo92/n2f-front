import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import * as Constants from 'src/app/shared/constants';

export const MESSAGE_USER_EMAIL_NOT_EXIST = "User with email and password does not exist.";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {

  @ViewChild(MessageComponent) message: MessageComponent;

  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Constants.REGEX_EMAIL)]],
      password: ['', Validators.required]
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
     this.authService.login_with_local(email, pwd).then((result) => {
       if (!result) {
         this.message.show_error(MESSAGE_USER_EMAIL_NOT_EXIST);
       }
     })
     .finally(()=> {this.loading = false });
  }

}
