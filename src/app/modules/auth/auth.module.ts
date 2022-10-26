import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AutRoutingModule,
  ],
  declarations: [
    SignInPageComponent,
  ]
})
export class AuthModule { }
