import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-numeric-editor",
  templateUrl: "./numeric-editor.component.html",
  styleUrls: ["./numeric-editor.component.less"],
})
export class NumericEditorComponent implements OnInit {
  @ViewChild("input", { static: false }) input;
  inputValue: any;

  constructor() {}

  ngOnInit() {}

  agInit(params: any): void {
    this.inputValue = params.value;
  }

  getValue() {
    return this.input.nativeElement.value;
  }

  isCancelAfterEnd() {
    return !this.isValid(this.input.nativeElement.value);
  }

  onChange(event) {
    if (!this.isValid(event)) {
      this.input.nativeElement.classList.add("invalid-cell");
    } else {
      this.input.nativeElement.classList.remove("invalid-cell");
    }
  }

  isValid(value) {
    return !isNaN(value);
  }
}
