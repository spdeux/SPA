import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { CountryService } from "src/app/services/country.service";

@Component({
  selector: "app-alt-spellings-editor",
  templateUrl: "./alt-spellings-editor.component.html",
  styleUrls: ["./alt-spellings-editor.component.less"],
})
export class AltSpellingsEditorComponent implements OnInit, OnDestroy {
  altOptions: Array<{ label: string; value: string }> = [];
  subscription: Subscription;
  selectedValues = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.getDefaultSpellings();
  }

  agInit(params: any): void {
    if (!(params && params.value)) return;

    params.value.forEach((element) => {
      this.selectedValues.push(element);
    });
  }

  getValue() {
    return this.selectedValues;
  }

  private getDefaultSpellings() {
    this.subscription = this.countryService
      .getDefaultSpellings()
      .subscribe((response) => {
        this.altOptions = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
