import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { NotedefraisService } from './services/notedefrais.service';
import { NoteDeFraisRoutingModule } from './notedefrais-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    NoteDeFraisRoutingModule,
  ],
  declarations: [
    InputPageComponent,
    ViewPageComponent
  ]
})
export class NotedefraisModule { }
