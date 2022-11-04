
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotedefraisService } from '../modules/notedefrais/services/notedefrais.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from './modules/material.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule
    ],
    declarations: [
        MessageComponent,
        ConfirmDialogComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        MessageComponent,
        ConfirmDialogComponent,
    ],
    entryComponents: [ConfirmDialogComponent],
    providers: [NotedefraisService]
})
export class SharedModule { }