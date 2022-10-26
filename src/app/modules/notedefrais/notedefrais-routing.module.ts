import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../auth/auth.guard';
import { InputPageComponent } from './pages/input-page/input-page.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';

const routes: Routes = [
    { path: "input", component: InputPageComponent },
    { path: "view", component: ViewPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteDeFraisRoutingModule { }
