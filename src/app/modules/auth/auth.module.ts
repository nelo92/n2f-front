import { NgModule } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutRoutingModule } from './auth-routing.module';
import { LoginNetworkComponent } from './components/login-network/login-network.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
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
    ForgotPasswordPageComponent,
    LoginNetworkComponent,    
  ]
})
export class AuthModule { }
