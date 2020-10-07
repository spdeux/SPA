import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-lat-lng-editor",
  templateUrl: "./lat-lng-editor.component.html",
  styleUrls: ["./lat-lng-editor.component.less"],
})
export class LatLngEditorComponent implements OnInit {
  @ViewChild("lat", { static: false }) lat;
  @ViewChild("lng", { static: false }) lng;
  latitude: number;
  longitude: number;
  latLng: number[] = [];
  constructor() {}

  ngOnInit() {}

  agInit(params: any): void {
    if (params && params.value) {
      const latLng = params.value;
      this.latitude = latLng[0];
      this.longitude = latLng[1];
    }
  }

  getValue() {
    this.latLng.push(this.lat.nativeElement.value);
    this.latLng.push(this.lng.nativeElement.value);
    return this.latLng;
  }

  isCancelAfterEnd() {
    const lat = this.lat.nativeElement.value;
    const lng = this.lng.nativeElement.value;
    return !(this.isValid(-90, 90, lat) && this.isValid(-90, 180, lng));
  }

  isValid(min, max, value) {
    return !isNaN(value) && value >= min && value <= max;
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
