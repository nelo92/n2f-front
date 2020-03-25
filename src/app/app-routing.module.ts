import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {InputComponent} from "./notedefrais/input/input.component";
import {ViewComponent} from "./notedefrais/view/view.component";

const routes: Routes = [
    {path: "input", component: InputComponent},
    {path: "view", component: ViewComponent}  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }