import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizChallengePage } from './quiz-challenge.page';

describe('QuizChallengePage', () => {
  let component: QuizChallengePage;
  let fixture: ComponentFixture<QuizChallengePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizChallengePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizChallengePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
