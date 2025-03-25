import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AiAnalysisComponent } from '../view-ai-analysis/view-ai-analysis.component';
import { DashboardService } from '../../dashboard-services/dashboard.service';

@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.scss']
})
export class MyChallengeComponent implements OnInit {
  allChallenges: any[] = [];
  constructor(private dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}
  ngOnInit(): void {
    this.dashboardService.getAllChallenges().subscribe((data => { this.allChallenges = data }));
  }

  // challenges object- title, subject, date, grade
  // getsubject- subject
  currentPage=1;
  getSubjectClass(subject: string) {
    return {
      'maths': subject === 'maths',
      'physics': subject === 'physics',
      'chemistry': subject === 'chemistry',
      'biology': subject === 'biology'
    };
  }
   openAiAnalysis() {
    console.log('Opening AI Analysis dialog...');
    this.dialog.open(AiAnalysisComponent, {
          width: '500px',
          data: {
            userName: 'Harry',
            maxMarks: 10,
            marksObtained: 9,
            incorrectAnswers: 1,
            unattempted: 1,
            accuracy: 90,
            recommendations: [
              'You should revise Algebraic Expressions and Thermodynamics.',
              "You're strong in Coordinate Geometry – keep it up!",
              'Based on your pace, try a 15-minute Medium challenge next.'
            ]
          }
        });
      }
}
