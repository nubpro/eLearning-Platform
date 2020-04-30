import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePlayerPage } from './module-player.page';

describe('ModulePlayerPage', () => {
  let component: ModulePlayerPage;
  let fixture: ComponentFixture<ModulePlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulePlayerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
