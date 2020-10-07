import { Component, OnInit, ViewChild } from "@angular/core";
import { CountryService } from "src/app/services/country.service";
import { Country } from "src/app/model/country";

@Component({
  selector: "app-lat-lng-map-editor",
  templateUrl: "./lat-lng-map-editor.component.html",
  styleUrls: ["./lat-lng-map-editor.component.less"],
})
export class LatLngMapEditorComponent implements OnInit {
  @ViewChild("lat", { static: false }) lat;
  @ViewChild("lng", { static: false }) lng;
  latitude: number;
  longitude: number;
  latLng: number[] = [];
  isVisibleModal: boolean = false;
  constructor(private countryService: CountryService) {}

  ngOnInit() {}

  agInit(params: any): void {
    if (params && params.value) {
      this.countryService.countryList$.subscribe((ctrs) => {
        const id = params.data.id;
        const country: Country = ctrs.find((c) => c.id === id);
        const latLng = country ? country.latlng : params.value;
        this.latitude = latLng[0];
        this.longitude = latLng[1];
      });
    }
  }

  getValue() {
    this.latLng = [this.latitude, this.longitude];
    return this.latLng;
  }

  isCancelAfterEnd() {
    const isCancel =
      !(
        this.isValid(-90, 90, this.latitude) &&
        this.isValid(-90, 180, this.longitude)
      ) ||
      !this.latitude ||
      !this.longitude;
    return isCancel;
  }

  isValid(min, max, value) {
    return !isNaN(value) && value >= min && value <= max;
  }

  onLatLngChange(event) {
    this.latLng = [...event];
  }

  onMapClick() {
    this.isVisibleModal = true;
  }

  onOkMap(): void {
    this.latitude = this.latLng[0];
    this.longitude = this.latLng[1];

    this.isVisibleModal = false;
  }

  onCancelMap(): void {
    this.isVisibleModal = false;
  }

  onLatChange(event) {
    const element = this.lat.nativeElement;
    if (!this.isValid(-90, 90, event)) {
      this.addErrorClass(element);
    } else {
      this.removeErrorClass(element);
    }
  }
  onLngChange(event) {
    const element = this.lng.nativeElement;
    if (!this.isValid(-90, 180, event)) {
      this.addErrorClass(element);
    } else {
      this.removeErrorClass(element);
    }
  }

  private addErrorClass(element) {
    element.classList.add("invalid-cell");
  }

  private removeErrorClass(element) {
    element.classList.remove("invalid-cell");
  }
}
