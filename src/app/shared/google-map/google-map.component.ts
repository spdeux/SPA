import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.less"],
})
export class GoogleMapComponent implements OnInit {
  zoom: number;
  @Input() latitude: number;
  @Input() longitude: number;
  @Output() latLngChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.setCurrentLocation();
  }

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = !this.latitude
          ? position.coords.latitude
          : this.latitude;

        this.longitude = !this.longitude
          ? position.coords.longitude
          : this.longitude;
        this.zoom = 15;
      });
    }
  }

  mapClicked(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.latLngChange.emit([this.latitude, this.longitude]);
  }
}
