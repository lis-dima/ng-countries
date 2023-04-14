import { Component } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-countries-preview',
  templateUrl: './countries-preview.component.html',
  styleUrls: ['./countries-preview.component.css']
})
export class CountriesPreviewComponent {
  countries: Country[] = [];
  constructor(
    private countryService: CountryService
  ) { }
  ngOnInit(): void {
    this.countryService.countries$.subscribe(d => {
      this.countries = d;
    });
  }
}
