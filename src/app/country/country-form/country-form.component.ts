import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { CountryService } from "src/app/services/country.service";
import { CountrySpelling } from "./../../model/country-spelling";
import { Country } from "./../../model/country";
import * as moment from "moment-timezone";

@Component({
  selector: "app-country-form",
  templateUrl: "./country-form.component.html",
  styleUrls: ["./country-form.component.less"],
})
export class CountryFormComponent implements OnInit, OnDestroy {
  countryForm!: FormGroup;
  seletedTimezone: string;
  isSendingRequest: boolean = false;
  altOptions: Array<CountrySpelling> = [];
  subscriptions: Subscription[] = [];
  isVisibleModal: boolean = false;
  latLng: number[] = [];
  lat: number;
  lng: number;

  constructor(
    private form: FormBuilder,
    private countryService: CountryService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getDefaultSpellings();
    this.createForm();
  }

  private createForm() {
    this.countryForm = this.form.group({
      name: ["", [Validators.required]],
      alpha2Code: ["", [Validators.required]],
      alpha3Code: ["", [Validators.required]],
      capital: ["", [Validators.required]],
      altSpellings: [null],
      region: ["", [Validators.required]],
      subregion: ["", [Validators.required]],
      population: ["", [Validators.required]],
      lat: [
        "",
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.min(-90),
          Validators.max(90),
          Validators.pattern(/\-?\d*\.?\d{1,2}/),
        ],
      ],
      lon: [
        "",
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.min(-90),
          Validators.max(180),
          Validators.pattern(/\-?\d*\.?\d{1,2}/),
        ],
      ],
      demonym: ["", [Validators.required]],
      timezones: [""],
      nativeName: ["", [Validators.required]],
    });
  }

  private createCountry(formValue: any) {
    this.isSendingRequest = true;

    const currentCountry: Country = {
      name: formValue.name,
      alpha2Code: formValue.alpha2Code,
      alpha3Code: formValue.alpha3Code,
      capital: formValue.capital,
      altSpellings: [...formValue.altSpellings],
      region: formValue.region,
      subregion: formValue.subregion,
      population: formValue.population,
      latlng: [formValue.lon, formValue.lat],
      demonym: formValue.demonym,
      timezones: this.seletedTimezone,
      nativeName: formValue.nativeName,
    };

    this.countryService.createCountries(currentCountry).then(
      (response) => {
        this.isSendingRequest = false;
        this._router.navigate(["countryList"]);
      },
      (err) => {
        this.isSendingRequest = false;
        console.error(err);
      }
    );
  }

  submitForm(): void {
    if (this.countryForm.valid) {
      this.createCountry(this.countryForm.value);
    }
  }

  changeTimezone(event) {
    const local = moment().tz(event).format("Z");
    this.seletedTimezone = `${event} (GMT${local})`;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.countryForm.controls[controlName].hasError(errorName);
  };

  onCancel = () => {
    this._router.navigate(["countryList"]);
  };

  private getDefaultSpellings() {
    const subscription = this.countryService
      .getDefaultSpellings()
      .subscribe((response) => {
        this.altOptions = response;
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  onLatLngChange(event) {
    this.latLng = [...event];
  }

  onMapClick() {
    this.isVisibleModal = true;
  }

  onOkMap(): void {
    this.lat = this.latLng[0];
    this.lng = this.latLng[1];

    this.isVisibleModal = false;
  }

  onCancelMap(): void {
    this.isVisibleModal = false;
  }
}
