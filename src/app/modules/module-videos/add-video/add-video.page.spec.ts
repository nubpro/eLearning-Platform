import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoPage } from './add-video.page';

describe('AddVideoPage', () => {
  let component: AddVideoPage;
  let fixture: ComponentFixture<AddVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
