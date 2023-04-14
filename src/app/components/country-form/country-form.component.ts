import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService, CrudResponse } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CreateCountryComponent implements OnInit {
  @Input()
  country: Country = new Country("", "");
  name: any;
  errors: string[] = [];
  btnText = "Create";

  constructor(
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    if (this.name) {
      this.btnText = "Update";
      this.countryService.loadAllFromServer((d: Country[]) => {
        this.country = d.find(c => c.name == this.name) ?? new Country("", "");
      });
    }
  }

  formHandler() {
    if (this.name) {
      //edit
      this.EditCountry();
    } else {
      this.CreateCountry();
    }
  }
  EditCountry() {
    this.countryService.editCountry(
      this.country,
      (r: CrudResponse) => {
        if (r.isSuccessful) {
          this.country = new Country("", "");
          this.router.navigate([""]);
        } else{
          this.errors = r.errorMsgs;
        }
      }
    );
  }

  CreateCountry() {
    this.countryService.createCountry(
      this.country,
      (r: CrudResponse) => {
        if (r.isSuccessful) {
          this.country = new Country("", "");
          this.router.navigate([""]);
        } else {
          this.errors = r.errorMsgs;
        }
      }
    );
  }
}
