import { NgModule } from "@angular/core";
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from "./app.component";
import { RootModule } from "./modules/root/root.module";
import { AppRoutingModule } from "./app-routing.module";

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
    SharedModule,
    CoreModule,
    RootModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
