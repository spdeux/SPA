import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeZoneEditorComponent } from './time-zone-editor.component';

describe('TimeZoneEditorComponent', () => {
  let component: TimeZoneEditorComponent;
  let fixture: ComponentFixture<TimeZoneEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeZoneEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
