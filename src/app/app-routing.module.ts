import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { InputComponent } from './pages/notedefrais/input/input.component';
import { ViewComponent } from './pages/notedefrais/view/view.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';


const routes: Routes = [
    { path: "sign-in", component: SignInComponent },
    { path: "sign-up", component: SignUpComponent },

    { path: "input", component: InputComponent },
    { path: "view", component: ViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }