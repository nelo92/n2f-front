
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { NotedefraisService } from './services/notedefrais.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        MessageComponent,
        ConfirmDialogComponent,
    ],
    exports: [
        MessageComponent,
        ConfirmDialogComponent,
    ],
    entryComponents: [ConfirmDialogComponent],
    providers: [NotedefraisService]
})
export class SharedModule { }