import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleVideosPage } from './module-videos.page';

describe('ModuleVideosPage', () => {
  let component: ModuleVideosPage;
  let fixture: ComponentFixture<ModuleVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleVideosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
