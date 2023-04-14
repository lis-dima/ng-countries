import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesPreviewComponent } from './components/countries-preview/countries-preview.component';
import { CountryPreviewComponent } from './components/country-preview/country-preview.component';
import { CreateCountryComponent } from './components/country-form/country-form.component';
import { FormsModule } from '@angular/forms';
import { CountryDetailsComponent } from './components/country-details-component/country-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesPreviewComponent,
    CountryPreviewComponent,
    CreateCountryComponent,
    CountryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
