import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

import { Country } from "src/app/model/country";
import { CountrySpelling } from "../model/country-spelling";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  countryList$: Observable<Country[]>;
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  getCountries() {
    this.countryList$ = this.firestore
      .collection<Country>("country")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data();
            return { id, ...data } as Country;
          });
        })
      );

    return this.countryList$;
  }

  createCountries(country: Country) {
    return this.firestore.collection<Country>("country").add(country);
  }

  updateCountries(countryKey: string, country: Country) {
    return this.firestore.collection("country").doc(countryKey).set(country);
  }

  deleteCustomer(customerKey: string) {
    return this.firestore.collection("country").doc(customerKey).delete();
  }

  getDefaultSpellings() {
    return this.firestore
      .collection<CountrySpelling>("countrySpelling")
      .valueChanges();
  }
}
