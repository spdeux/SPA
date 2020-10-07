import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLngMapEditorComponent } from './lat-lng-map-editor.component';

describe('LatLngMapEditorComponent', () => {
  let component: LatLngMapEditorComponent;
  let fixture: ComponentFixture<LatLngMapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatLngMapEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatLngMapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
