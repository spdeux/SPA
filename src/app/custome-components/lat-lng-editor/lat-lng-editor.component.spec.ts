import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLngEditorComponent } from './lat-lng-editor.component';

describe('LatLngEditorComponent', () => {
  let component: LatLngEditorComponent;
  let fixture: ComponentFixture<LatLngEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatLngEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatLngEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
