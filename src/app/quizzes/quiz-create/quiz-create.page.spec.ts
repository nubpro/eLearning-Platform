import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreatePage } from './quiz-create.page';

describe('QuizCreatePage', () => {
  let component: QuizCreatePage;
  let fixture: ComponentFixture<QuizCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
