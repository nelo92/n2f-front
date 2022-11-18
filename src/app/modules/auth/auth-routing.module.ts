import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';

const routes: Routes = [
    { path: "sign-in", component: SignInPageComponent },
    { path: "sign-up", component: SignUpPageComponent },
    // { path: "forgot-pwd", component: ForgotPasswordPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AutRoutingModule { }
