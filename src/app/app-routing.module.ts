import { AuthGuard } from './modules/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { InputComponent } from './pages/notedefrais/input/input.component';
import { ViewComponent } from './pages/notedefrais/view/view.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';

const routes: Routes = [
    { path: "", redirectTo: "/sign-in", pathMatch: "full" },
    { path: "sign-in", component: SignInComponent },
    { path: "input", component: InputComponent, canActivate: [AuthGuard] },
    { path: "view", component: ViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
