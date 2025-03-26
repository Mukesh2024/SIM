import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AiAnalysisComponent } from '../view-ai-analysis/view-ai-analysis.component';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.scss']
})
export class MyChallengeComponent implements OnInit {
  allChallenges: any[] = [];
  myChallenges: any[] = [];
  subjectAndTopics: { subject: string; topics: string[]; };
  showAIAnalysis:boolean = false;
  challengeId: string = ''; 
  constructor(private dialog: MatDialog,
    private router: Router,
    private questionService: QuestionService,
  ) {
    this.subjectAndTopics = { subject: '', topics: [] };
  }
  ngOnInit(): void {
 
    this.questionService.getMyChallenges().subscribe((data => { 
      this.myChallenges = data;
      if (this.myChallenges.length > 0) {
  // Assign challengeId in ngOnInit or appropriate method
  this.challengeId = this.myChallenges[0].guid;
      }
    }));
   
  }
 
  navigateToChallengeReview(challengeId: string) {
    // Navigate to the review-challenge route with the challengeId parameter
    this.router.navigate(['/review-challenge', challengeId]);
  }

  currentPage=1;
  getSubjectClass(subject: string) {
    return {
      'Math': subject === 'Math',
      'Physics': subject === 'Physics',
      'Chemistry': subject === 'Chemistry',
      'Biology': subject === 'Biology'
    };
  }
   openAiAnalysis() {
    this.showAIAnalysis = true;
  
      }
      closeAiAnalysis() {
        this.showAIAnalysis = false;
      }
}
