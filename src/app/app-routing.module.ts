import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CountryFormComponent } from "./country/country-form/country-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CountryListComponent } from "./country/country-list/country-list.component";
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/countryList" },
  {
    path: "welcome",
    loadChildren: () =>
      import("./pages/welcome/welcome.module").then((m) => m.WelcomeModule),
  },
  { path: "country", component: CountryFormComponent },
  { path: "countryList", component: CountryListComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
