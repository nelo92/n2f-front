import { NgModule } from "@angular/core";
import { ChartPageComponent } from "./pages/chart-page/chart-page.component";
import { RouterModule, Routes } from "@angular/router";
import { InputPageComponent } from "./pages/input-page/input-page.component";
import { ViewPageComponent } from "./pages/view-page/view-page.component";

const routes: Routes = [
  { path: "input", component: InputPageComponent },
  { path: "view", component: ViewPageComponent },
  { path: "chart", component: ChartPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteDeFraisRoutingModule {}
