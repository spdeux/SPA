import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltSpellingsEditorComponent } from './alt-spellings-editor.component';

describe('AltSpellingsEditorComponent', () => {
  let component: AltSpellingsEditorComponent;
  let fixture: ComponentFixture<AltSpellingsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltSpellingsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltSpellingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
