import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { NotedefraisService } from './services/notedefrais.service';
import { MaterialModule } from './modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { InputComponent } from '../pages/notedefrais/input/input.component';
import { ViewComponent } from '../pages/notedefrais/view/view.component';
import { SignInComponent } from '../pages/auth/sign-in/sign-in.component';

@NgModule({
    imports: [

        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,

        CommonModule,
        MaterialModule
    ],
    declarations: [
        MessageComponent,
        ConfirmDialogComponent,

        InputComponent,
        ViewComponent,
        SignInComponent

    ],
    exports: [
        MessageComponent,
        ConfirmDialogComponent,
        MaterialModule
    ],
    entryComponents: [ConfirmDialogComponent],
    providers: [NotedefraisService]
})
export class SharedModule { }