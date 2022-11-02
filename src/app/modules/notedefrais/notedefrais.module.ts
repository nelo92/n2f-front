import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { NoteDeFraisRoutingModule } from './notedefrais-routing.module';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    SharedModule,
    NoteDeFraisRoutingModule,
    ChartsModule
  ],
  declarations: [
    InputPageComponent,
    ViewPageComponent,
    ChartPageComponent
  ]
})
export class NotedefraisModule { }
