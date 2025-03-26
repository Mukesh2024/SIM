import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../component/services/recomondation.service';
import { ChallengeService } from '../component/services/challenge.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-challenge-review',
  templateUrl: './challenge-review.component.html',
  styleUrls: ['./challenge-review.component.scss'],
})
export class ChallengeReviewComponent implements OnInit {
  recommendation: string = '';
  challengeId: any = '';
  questions: any[] = [];
  details: any;
  index: number = 0;
  selectedQuestionDetail: any = null;
  grade: any;
  totalCorrect:number = 0;
  totalInCorrect :number = 0;
  totalNotAttempt :number = 0;

  constructor(
    private recommendationService: RecommendationService,
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    if (this.challengeId) {
      this.getQuestions(this.challengeId);
    } else {
      console.error('No challenge ID found in route!');
    }
  }
  showSummary = true;
  // getGrade(challengeId: string) {

  //   this.challengeService.getQuestion(challengeId).subscribe({
  //     next: (response: any) => {
  //       console.log("Response from challenge service:", response.questionCollections);
  //    this.grade= response.questionDetails.grade;
  //       if (response.questionCollections) {
  //         this.questions = response.questionCollections;
  //        // this.getRecommendation(response.questionCollections[0]);
  //       } else {
  //         console.error("Invalid response structure", response);
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Error fetching challenge questions:", err);
  //     }
  //   });
  // }

  getQuestions(challengeId: string) {
    this.challengeService.getQuestionsAns(challengeId).subscribe({
      next: (response: any) => {
        this.details = response.details;
        if (response.userAnswer) {
          this.questions = response.userAnswer;
          this.totalCorrect = response.totalCorrect ;
          this.totalInCorrect = response.totalInCorrect ;
          this.totalNotAttempt = response.totalNotAttempt ;
          this.onSelectQuestion(0);
        } else {
          console.error('Invalid response structure', response);
        }
      },
      error: (err) => {
        console.error('Error fetching challenge questions:', err);
      },
    });
  }

  onSelectQuestion(index: number): void {
    if (this.questions && this.questions.length > 0 && this.questions[index]) {
      this.selectedQuestionDetail = this.questions[index];
      this.index = index;
      this.recommendation = "";
      this.getRecommendation(this.selectedQuestionDetail);
      console.log('Selected Question:', this.selectedQuestionDetail);
      // this.updateMainContent(this.selectedQuestionDetail, index);
    }
  }

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.recommendation);
  }

  updateMainContent(question: any, questionNumber: number): void {}

  getRecommendation(questionDetail: any) {
    const questionData = {
      guid: this.challengeId,
      grade: 'Grade-1',
      questionDetail: questionDetail,
    };

    this.recommendationService.getRecommadation(questionData).subscribe({
      next: (response: string) => {
        this.recommendation =  response;
      }
    });
  }

  toggleSummary() {
    this.showSummary = !this.showSummary;
  }
}
