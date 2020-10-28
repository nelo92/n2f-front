import { environment } from "../environments/environment";

import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from "./modules/material.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { NotedefraisService } from './services/notedefrais.service';
import { InputComponent } from './pages/notedefrais/input/input.component';
import { ViewComponent } from './pages/notedefrais/view/view.component';
import { ForgotPwdComponent } from './pages/auth/forgot-pwd/forgot-pwd.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InputComponent,
    ViewComponent,
    MessageComponent,
    ConfirmDialogComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPwdComponent,
    VerifyEmailComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent],
  providers: [NotedefraisService]
})
export class AppModule { }
