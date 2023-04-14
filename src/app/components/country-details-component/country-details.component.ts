import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from './../../models/country';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  @Input()
  country!: Country;

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    if (history.state.country) {
      this.country = history.state.country;
    } else {
      const countryName = this.route.snapshot.params['name'];
      this.countryService.loadAllFromServer((d: Country[]) => {
        this.country = d.find(c => c.name == countryName) ?? new Country("", "");
      });
    }
  }
}
