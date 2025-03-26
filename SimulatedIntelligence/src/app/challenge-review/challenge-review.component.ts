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
  challengeId: any = '';
  questions: any[] = [];
  index: number = 0;
  selectedQuestionDetail: any = null;
  grade: any;

  constructor(private recommendationService: RecommendationService, private challengeService: ChallengeService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    if (this.challengeId) {
      this.getQuestions(this.challengeId);
   
    } else {
      console.error("No challenge ID found in route!");}
  
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
            console.log("Response from challenge service:", response.questionCollections); 
       
            if (response) { 
              this.questions = response;
             // this.getRecommendation(response.questionCollections[0]);
            } else {
              console.error("Invalid response structure", response);
            }
          },
          error: (err) => {
            console.error("Error fetching challenge questions:", err);
          }
        });
      }
  
  onSelectQuestion(index: number): void {
    if (this.questions && this.questions.length > 0 && this.questions[index]) {
      this.selectedQuestionDetail = this.questions[index];
      this.index= index;
      this.getRecommendation(this.selectedQuestionDetail);
      console.log("Selected Question:", this.selectedQuestionDetail);
      // this.updateMainContent(this.selectedQuestionDetail, index);
    }
  }
  updateMainContent(question: any, questionNumber: number): void {
  
  }
 
  getRecommendation(questionDetail: any) {

    const questionData = {
      guid:this.challengeId,
      grade: this.grade,
      questionDetail: questionDetail
    };

    this.recommendationService.getRecommadation(questionData).subscribe(
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
