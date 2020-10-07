import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.less"],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  backToHomePage() {
    this._router.navigate([""]);
  }
}
