import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
    { path: "sign-in", component: SignInPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AutRoutingModule { }
