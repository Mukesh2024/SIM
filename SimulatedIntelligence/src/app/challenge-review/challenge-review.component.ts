import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../component/services/recomondation.service';
import { ChallengeService } from '../component/services/challenge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge-review',
  templateUrl: './challenge-review.component.html',
  styleUrls: ['./challenge-review.component.scss']
})
export class ChallengeReviewComponent implements OnInit {
  recommendation: string = '';
  questions: any[] = [];
  model: any = {
    Guid: 'some-guid',
    grade: 'A',
    questionsCollection: [
      {}]
  };
  constructor(private recommendationService: RecommendationService, private challengeService: ChallengeService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const challengeId = this.route.snapshot.paramMap.get('id');
    if (challengeId) {
      this.getQuestions(challengeId);
    } else {
      console.error("No challenge ID found in route!");}
    this.getRecommendation();
  }
  showSummary = true;
  getQuestions(challengeId: string) {
    debugger;
    this.challengeService.getQuestion(challengeId).subscribe({
      next: (response) => {
        console.log("Response from challenge service:", response.questionDetails); // Print the data to the console
     
        if (Array.isArray(response.questionDetails)) { 
          this.questions = response.questionDetails;

        } else {
          console.error("Invalid response structure", response);
        }
      },
      error: (err) => {
        console.error("Error fetching challenge questions:", err);
      }
    });
  }
  
 
  getRecommendation() {
    this.recommendationService.getRecommadation(this.model).subscribe(
      (response) => {
        console.log('Recommendation fetched:', response
        );
        this.recommendation = response.choices?.[0]?.message?.content || 'No recommendation available';
      },
      (error) => {
        console.error('Error fetching recommendation:', error);
      }
    );
  }

  toggleSummary() {
    this.showSummary = !this.showSummary;
  }
}
