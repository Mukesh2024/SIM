import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge-review',
  templateUrl: './challenge-review.component.html',
  styleUrls: ['./challenge-review.component.scss']
})
export class ChallengeReviewComponent {
  showSummary = true;

  toggleSummary() {
    this.showSummary = !this.showSummary;
  }
}
