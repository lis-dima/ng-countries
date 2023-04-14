import { CountryService } from 'src/app/services/country.service';
import { Component, Input } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.css']
})
export class CountryPreviewComponent {
  @Input()
  country!: Country;
  /**
   *
   */
  constructor(
    private countryService: CountryService
  ) {
  }
  ngOnInit() {
  }

  deleteCountry() {
    this.countryService.deleteCountry(this.country);
  }

  editCountry(){
    
  }
}
