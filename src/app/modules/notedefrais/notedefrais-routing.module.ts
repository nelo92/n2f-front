import { NgModule } from "@angular/core";
import { ChartPageComponent } from "./pages/chart-page/chart-page.component";
import { RouterModule, Routes } from "@angular/router";
import { InputPageComponent } from "./pages/input-page/input-page.component";
import { ViewPageComponent } from "./pages/view-page/view-page.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { AdminGuard } from "src/app/modules/auth/admin.guard";

const routes: Routes = [
  { path: "input", component: InputPageComponent },
  { path: "view", component: ViewPageComponent },
  { path: "chart", component: ChartPageComponent },
  { path: "admin", component: AdminPageComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteDeFraisRoutingModule {}
