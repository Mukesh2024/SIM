import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard-services/dashboard.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService){}
  ngOnInit(): void {
  
    this.dashboardService.getRecentChallenges().subscribe((data =>{ this.recentChallenges = data.recentChallenges}));
    this.dashboardService.getExpertiseTopics().subscribe((data =>{ this.expertiseTopics = data.expertiseTopics}));
  }
  recentChallenges: Challenge[] = [];
  

 //recentChallenges object- title, grade, date, image
 //expertiseTopics object- title, subject, questions, accuracy
 //getGradeClass- grade
 //getSubjectClass- subject


  expertiseTopics: topic[] = [];
 
  getGradeClass(grade: string) {
    return {
      'grade-high': grade === 'A+' || grade === 'A',
      'grade-medium': grade === 'B' || grade === 'C',
      'grade-low': grade === 'D' || grade === 'F'
    };
  }
 
  getSubjectClass(subject: string) {
    return {
      'maths': subject === 'Maths',
      'physics': subject === 'Physics',
      'chemistry': subject === 'Chemistry',
      'bio': subject === 'Bio'
    };
  }

  isCreateChallengeOpen = false;

  openCreateChallenge() {
    this.isCreateChallengeOpen = true;
  }
  
}
interface Challenge {
  grade: string;
  title: string;
  date: string;
  // Add other properties as needed
}
interface topic{
  title: string;
  subject: string;
  questions: number;
  accuracy: number;
  totalQuestions: number;
  // Add other properties as needed
}