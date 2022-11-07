import { NgModule } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutRoutingModule } from './auth-routing.module';
import { LoginNetworkComponent } from './components/login-network/login-network.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

@NgModule({
  imports: [
    SharedModule,
    AutRoutingModule,
    NgxCaptchaModule
  ],
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    ForgetPasswordPageComponent,
    LoginNetworkComponent,    
  ]
})
export class AuthModule { }
