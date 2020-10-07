import { Injectable } from "@angular/core";
import * as momentTimezon from "moment-timezone";
import { Moment } from "moment";
@Injectable({
  providedIn: "root",
})
export class TimeZoneService {
  public tenantTimeZone: string = "GMT";

  constructor() {}

  public setTenantTimeZone(tenantTz: string) {
    this.tenantTimeZone = tenantTz;
  }

  public utcToTenant(utcDateTime: Moment): Moment {
    return momentTimezon.tz(utcDateTime, this.tenantTimeZone);
  }

  public utcToTenantString(utcDateTime: Moment, format: string): string {
    format =
      momentTimezon.tz.guess() === this.tenantTimeZone
        ? format
        : format + " (UTC Z)";
    return momentTimezon.tz(utcDateTime, this.tenantTimeZone).format(format);
  }

  public tenantToUtc(tenantDateTime: Moment): Moment {
    return momentTimezon(tenantDateTime).utc();
  }
}
