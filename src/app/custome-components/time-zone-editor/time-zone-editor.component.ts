import { Component, OnInit } from "@angular/core";
import * as moment from "moment-timezone";
@Component({
  selector: "app-time-zone-editor",
  templateUrl: "./time-zone-editor.component.html",
  styleUrls: ["./time-zone-editor.component.less"],
})
export class TimeZoneEditorComponent implements OnInit {
  timezoneString: string = "";
  seletedTimezone: string = "";
  constructor() {}

  ngOnInit() {}

  agInit(params: any): void {
    this.seletedTimezone = params.value;

    if (!this.seletedTimezone) return;
    let timeZoneValue = this.seletedTimezone.substring(
      0,
      this.seletedTimezone.lastIndexOf("(")
    );
    if (!timeZoneValue) return;
    this.timezoneString = timeZoneValue.trim();
  }
  getValue() {
    return this.seletedTimezone;
  }
  changeTimezone(event) {
    const local = moment().tz(event).format("Z");
    this.seletedTimezone = `${event} (GMT${local})`;
  }
}
