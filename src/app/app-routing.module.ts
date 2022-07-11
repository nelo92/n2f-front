import { AuthGuard } from './modules/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { InputPageComponent } from './modules/notedefrais/pages/input-page/input-page.component';
import { ViewPageComponent } from './modules/notedefrais/pages/view-page/view-page.component';
import { SignInPageComponent } from './modules/auth/pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
    { path: "", redirectTo: "/auth/sign-in", pathMatch: "full" },
    {
        path: "auth",
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: "n2f",
        loadChildren: () => import('./modules/notedefrais/notedefrais.module').then(m => m.NotedefraisModule),
        canActivate: [AuthGuard]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
