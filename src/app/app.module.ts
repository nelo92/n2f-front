import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './notedefrais/input/input.component';
import { ViewComponent } from './notedefrais/view/view.component';
import { NotedefraisService } from './notedefrais/notedefrais.service';
import { MessageComponent } from './message/message.component';
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  imports:  [ 
    BrowserModule,  
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [ AppComponent,
    HeaderComponent, FooterComponent,
    InputComponent, ViewComponent, MessageComponent, ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap:  [ AppComponent ],
  providers: [ NotedefraisService ]
})
export class AppModule { }
