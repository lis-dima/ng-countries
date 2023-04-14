import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, count } from 'rxjs';
import { Country } from '../models/country';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = "https://countries-api.loc";

  private _countries: Country[] = [];
  private wasItited: boolean = false;
  private _countriesSubject = new BehaviorSubject<Country[]>(this._countries);

  get countries$(): Observable<Country[]> {
    return this._countriesSubject.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    this.loadAllFromServer();
  }

  loadAllFromServer(cb?: Function): Observable<Country[]> {
    this.wasItited = true;
    const req = this.http.get<Country[]>(this.apiUrl + "/country/getAll");
    req.subscribe(d => {
      this._countries = d.map(c => new Country(c.name, c.id));
      this._countriesSubject.next(this._countries);
      if (cb) cb(d);
    });
    return req;
  }

  createCountry(contryToCreate: Country, cb?: Function): Observable<CrudResponse> {
    const req = this.http.post<CrudResponse>(this.apiUrl + "/country/CreateCountry", contryToCreate)
    req.subscribe(d => {
      if (d.isSuccessful) {
        this._countries.push(new Country(d.country.name, d.country.id));
        this._countriesSubject.next(this._countries);
      }
      if (cb) cb(d);
    });
    return req;
  }

  editCountry(contryToUpdate: Country, cb?: Function): Observable<CrudResponse> {
    const req = this.http.patch<CrudResponse>(this.apiUrl + "/country/UpdateCountry", contryToUpdate);
    req.subscribe(d => {
      console.log("data Is:", d);
      if (d.isSuccessful) {
        this._countries = this._countries.map(c => {
          if (c.id == contryToUpdate.id) c.name = contryToUpdate.name
          return c;
        })
        this._countriesSubject.next(this._countries);
      }
      if (cb) cb(d);
    });
    return req;
  }

  deleteCountry(country: Country): Observable<CrudResponse> {
    const req = this.http.delete<CrudResponse>(this.apiUrl + "/country/DeleteCountry", { body: country })
    req.subscribe(r => {
      if (r.isSuccessful) {
        console.log(r);
        this._countries = this._countries.filter(c => c.id != r.country.id);
        this._countriesSubject.next(this._countries);
      }
    });
    return req;
  }

  getCountryByName(name: any, cb?: Function): Country | undefined {
    if (this.wasItited)
      return this._countries.find(c => c.name == name);
    else {
      this.loadAllFromServer(cb);
      return undefined;
    }
  }
}


export interface CrudResponse {
  isSuccessful: boolean;
  country: Country;
  errorMsgs: string[]
}