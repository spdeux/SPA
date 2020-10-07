import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import { IconsProviderModule } from "./icons-provider.module";

//components
import { AppComponent } from "./app.component";
import { CountryFormComponent } from "./country/country-form/country-form.component";
import { CountryListComponent } from "./country/country-list/country-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

//Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

//Ng-Zorro
import {
  NgZorroAntdModule,
  NZ_I18N,
  en_US,
  NzInputModule,
  NzLayoutModule,
  NzSwitchModule,
  NzIconModule,
  NzButtonModule,
  NzPageHeaderModule,
  NzNotificationModule,
} from "ng-zorro-antd";
import { NzFormModule } from "ng-zorro-antd/form";

//ng-grid
import { AgGridModule } from "ag-grid-angular";
import { NzGridModule } from "ng-zorro-antd/grid";

//selec2
import en from "@angular/common/locales/en";
import { TimezonePickerModule } from "ng2-timezone-selector";

//Divider Of Ng-Zorro
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NumericEditorComponent } from "./custome-components/numeric-editor/numeric-editor.component";
import { TimeZoneEditorComponent } from "./custome-components/time-zone-editor/time-zone-editor.component";
import { AltSpellingsEditorComponent } from "./custome-components/alt-spellings-editor/alt-spellings-editor.component";
import { LatLngEditorComponent } from "./custome-components/lat-lng-editor/lat-lng-editor.component";

//googleMap
import { AgmCoreModule } from "@agm/core";
import { LatLngMapEditorComponent } from "./custome-components/lat-lng-map-editor/lat-lng-map-editor.component";
import { GoogleMapComponent } from "./shared/google-map/google-map.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CountryFormComponent,
    CountryListComponent,
    PageNotFoundComponent,
    NumericEditorComponent,
    TimeZoneEditorComponent,
    AltSpellingsEditorComponent,
    LatLngEditorComponent,
    LatLngMapEditorComponent,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCwQpzVkaise4u6YhXYVBVZqFjk7jAq1fY",
    }),

    AppRoutingModule,
    IconsProviderModule,
    NzDividerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzSwitchModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzPageHeaderModule,
    NzNotificationModule,
    AgGridModule.withComponents([
      NumericEditorComponent,
      TimeZoneEditorComponent,
      AltSpellingsEditorComponent,
      LatLngEditorComponent,
      LatLngMapEditorComponent,
    ]),
    TimezonePickerModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
