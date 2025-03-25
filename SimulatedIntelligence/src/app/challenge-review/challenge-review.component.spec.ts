import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeReviewComponent } from './challenge-review.component';

describe('ChallengeReviewComponent', () => {
  let component: ChallengeReviewComponent;
  let fixture: ComponentFixture<ChallengeReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeReviewComponent]
    });
    fixture = TestBed.createComponent(ChallengeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
