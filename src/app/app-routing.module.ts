import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCountryComponent } from './components/country-form/country-form.component';
import { CountriesPreviewComponent } from './components/countries-preview/countries-preview.component';
import { CountryDetailsComponent } from './components/country-details-component/country-details.component';

const routes: Routes = [
  { path: "countries/create", component: CreateCountryComponent },
  { path: "countries/:name", component: CountryDetailsComponent },
  { path: "countries/edit/:name", component: CreateCountryComponent },
  { path: "", component: CountriesPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
