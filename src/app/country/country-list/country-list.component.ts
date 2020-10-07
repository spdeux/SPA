import { Component, OnInit, OnDestroy } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { Subscription } from "rxjs";

import { NumericEditorComponent } from "src/app/custome-components/numeric-editor/numeric-editor.component";
import { TimeZoneEditorComponent } from "src/app/custome-components/time-zone-editor/time-zone-editor.component";
import { AltSpellingsEditorComponent } from "src/app/custome-components/alt-spellings-editor/alt-spellings-editor.component";
import { LatLngMapEditorComponent } from "src/app/custome-components/lat-lng-map-editor/lat-lng-map-editor.component";
import { LatLngEditorComponent } from "src/app/custome-components/lat-lng-editor/lat-lng-editor.component";
import { CountryService } from "./../../services/country.service";
import { Country } from "src/app/model/country";
import { NzNotificationService } from "ng-zorro-antd";

@Component({
  selector: "app-country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.less"],
})
export class CountryListComponent implements OnInit, OnDestroy {
  dataSource: Country[] = [];
  gridOptions: GridOptions;
  subscriptions: Subscription[] = [];
  isSendingRequest: boolean = false;
  selectedRow: any;
  gridApi: any;
  frameworkComponents: any = {
    numericEditorComponent: NumericEditorComponent,
    timeZoneEditorComponent: TimeZoneEditorComponent,
    altSpellingsEditorComponent: AltSpellingsEditorComponent,
    latLngEditorComponent: LatLngEditorComponent,
    latLngMapEditorComponent: LatLngMapEditorComponent,
  };
  private screen = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  };

  constructor(
    private countryService: CountryService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.getCountries();
    this.BindGrid();
  }

  getCountries() {
    this.isSendingRequest = true;

    const subscription = this.countryService.getCountries().subscribe(
      (countries) => {
        this.isSendingRequest = false;
        this.dataSource = countries;

        if (this.gridOptions.api)
          this.gridOptions.api.setRowData(this.dataSource);
      },
      (err) => {
        this.isSendingRequest = false;
        console.error(err);
      }
    );
    this.subscriptions.push(subscription);
  }

  BindGrid() {
    this.gridOptions = <GridOptions>{
      defaultColDef: { sortable: true },
      frameworkComponents: this.frameworkComponents,
      columnDefs: this.GetResColumnDefs(),
      enableSorting: true,
      rowData: this.dataSource,
      rowSelection: "single",
      editType: "fullRow",
      onGridReady: () => {
        this.gridOptions.api.setRowData(this.dataSource);
      },
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.setResColumnDefs();

    window.onresize = () => {
      this.setResColumnDefs();
    };
  }

  onSelectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows;
  }

  onRowValueChanged(event) {
    const updatedCountry: Country = event.data;
    let type: string;

    const message = this.ValidateCountry(updatedCountry);
    if (message) {
      type = "error";
      this.notification.create(type, "Erro Notification", message);
      return;
    }

    this.countryService
      .updateCountries(updatedCountry.id, updatedCountry)
      .then((result) => {
        type = "success";
        this.notification.create(
          type,
          "Notification",
          "Update Done Successfully!"
        );
      });
  }

  onCellValueChanged(event) {
    if (event.newValue !== event.oldValue) {
      if (!event.node.changedValues) event.node.changedValues = [];
      event.node.changedValues.push(event["column"]["colId"]);
    }
  }

  private createColumnDefs() {
    const { xs, sm, md, lg, xl } = this.screen;

    return [
      { field: "name", editable: true, view: [xs, sm, md, xl, lg] },
      {
        field: "alpha2Code",
        width: 120,
        resizable: true,
        editable: true,
        view: [xl],
      },
      {
        field: "alpha3Code",
        width: 120,
        resizable: true,
        editable: true,
        view: [xl],
      },
      { field: "capital", editable: true, view: [sm, md, xl, lg] },
      {
        field: "altSpellings",
        editable: true,
        width: 250,
        cellEditor: "altSpellingsEditorComponent",
        view: [xl, lg],
      },
      { field: "region", editable: true, view: [xl, lg] },
      { field: "subregion", editable: true, view: [xl, lg] },
      {
        headerName: "Population",
        field: "population",
        editable: true,
        width: 250,
        cellEditor: "numericEditorComponent",
        view: [md, xl, lg],
      },
      {
        field: "latlng",
        sortable: false,
        editable: true,
        width: 250,
        cellEditor: "latLngMapEditorComponent",
        view: [xl, lg],
        valueGetter: function (params) {
          if (params.data && params.data.latlng) {
            const latlng = params.data.latlng;
            const lat = parseFloat(latlng[0]).toFixed(2);
            const lng = parseFloat(latlng[1]).toFixed(2);
            return [lat, lng];
          }

          return params.data.latlng;
        },
      },
      { field: "demonym", editable: true },
      {
        field: "timezones",
        editable: true,
        cellEditor: "timeZoneEditorComponent",
        view: [md, xl, lg],
      },
      { field: "nativeName", editable: true, view: [xl, lg] },
    ];
  }

  private GetResColumnDefs() {
    const { xs, sm, md, lg, xl } = this.screen;
    const width = window.innerWidth;

    if (width <= 600) {
      /* Extra small devices (phones, 600px and down) */
      const xSmallScreen = this.getColumnsBasedOnScreenSize(xs);
      return xSmallScreen;
    } else if (width > 600 && width <= 768) {
      /* Small devices (portrait tablets and large phones, 600px and up) */
      const smallScreen = this.getColumnsBasedOnScreenSize(sm);
      return smallScreen;
    } else if (width > 768 && width <= 992) {
      /* Medium devices (landscape tablets, 768px and up) */
      const mediumScreen = this.getColumnsBasedOnScreenSize(md);
      return mediumScreen;
    } else if (width > 992 && width <= 1200) {
      /* Large devices (laptops/desktops, 992px and up) */
      const largeScreen = this.getColumnsBasedOnScreenSize(lg);
      return largeScreen;
    } else if (width > 1200) {
      /* Extra large devices (large laptops and desktops, 1200px and up) */
      const xLargeScreen = this.getColumnsBasedOnScreenSize(xl);
      return xLargeScreen;
    }
  }

  private getColumnsBasedOnScreenSize(screenSize: string) {
    return this.createColumnDefs().filter((col) => {
      if (col.view) {
        return col.view.includes(screenSize);
      }
      return false;
    });
  }

  private setResColumnDefs() {
    const columns = this.GetResColumnDefs();
    this.gridApi.setColumnDefs(columns);
    this.gridApi.sizeColumnsToFit();
  }

  private ValidateCountry(country: Country) {
    let message = "";
    if (!country.name) {
      message = "please insert country name.";
      return message;
    }
    if (!country.capital) {
      message = "please insert capital.";
      return message;
    }
    //you can check all required fields here

    return message;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
