import { NgModule } from "@angular/core";

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from "./app.component";
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MessageComponent } from './shared/components/message/message.component';
import { NotedefraisService } from './shared/services/notedefrais.service';
import { InputComponent } from './pages/notedefrais/input/input.component';
import { ViewComponent } from './pages/notedefrais/view/view.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';

// @NgModule({
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     AppRoutingModule,
//     HttpClientModule,
//     FormsModule,
//     ReactiveFormsModule,
//     AngularFireModule.initializeApp(environment.firebase),
//     AngularFirestoreModule,
//     MaterialModule,
//     CoreModule
//   ],
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     FooterComponent,
//     InputComponent,
//     ViewComponent,
//     MessageComponent,
//     ConfirmDialogComponent,
//     SignInComponent
//   ],
//   entryComponents: [ConfirmDialogComponent],
//   bootstrap: [AppComponent],
//   providers: [NotedefraisService]
// })
@NgModule({
  imports: [
    CoreModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    InputComponent,
    ViewComponent,
    SignInComponent
  ],
  // entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent],
  // providers: [NotedefraisService]
})
export class AppModule { }
