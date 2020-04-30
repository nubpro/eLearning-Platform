import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListPage } from './module-list.page';

describe('ModuleListPage', () => {
  let component: ModuleListPage;
  let fixture: ComponentFixture<ModuleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
