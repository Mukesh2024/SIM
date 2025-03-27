import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AiAnalysisComponent } from '../view-ai-analysis/view-ai-analysis.component';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { QuestionService } from '../../services/question.service';

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
  loadChallenges: boolean = true;

  constructor(private dialog: MatDialog,
    private dashboardService: DashboardService,
    private questionService: QuestionService
  ) {
    this.subjectAndTopics = { subject: '', topics: [] };
  }
  ngOnInit(): void {
 
    this.questionService.getMyChallenges().subscribe((data => {
      this.loadChallenges = false;
      return this.myChallenges = data
    }));
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
    // this.dialog.open(AiAnalysisComponent, {
    //       width: '500px',
    //       data: {
    //         userName: 'Harry',
    //         maxMarks: 10,
    //         marksObtained: 9,
    //         incorrectAnswers: 1,
    //         unattempted: 1,
    //         accuracy: 90,
    //         recommendations: [
    //           'You should revise Algebraic Expressions and Thermodynamics.',
    //           "You're strong in Coordinate Geometry – keep it up!",
    //           'Based on your pace, try a 15-minute Medium challenge next.'
    //         ]
    //       }
    //     });
      }
}
