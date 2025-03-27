import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard-services/dashboard.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
  myChallenges: any[] = [];
  loadChallenges: boolean = true;
  subjectAndTopics: { subject: string; topics: string[]; };
  constructor(private dashboardService: DashboardService,
    private questionService: QuestionService
  ){
    this.subjectAndTopics = { subject: '', topics: [] };
  }
  ngOnInit(): void {
  
    this.questionService.getMyChallenges().subscribe((data) => {
   
      this.myChallenges = data.slice(0, 4);
      this.loadChallenges = false;
    });
  }
  recentChallenges: Challenge[] = [];
  

 //recentChallenges object- title, grade, date, image
 //expertiseTopics object- title, subject, questions, accuracy
 //getGradeClass- grade
 //getSubjectClass- subject


  expertiseTopics: topic[] = [];
  calculateTotalQuestions(): number {
    const totalCorrect = this.myChallenges[0].totalCorrect;
    const totalInCorrect = this.myChallenges[0].totalInCorrect;
    const totalNotAttempt = this.myChallenges[0].totalNotAttempt;
    return totalCorrect + totalInCorrect + totalNotAttempt;
  }

  calculateAccuracy(): number {
    const totalCorrect = this.myChallenges[0].totalCorrect;
    const totalInCorrect = this.myChallenges[0].totalInCorrect;
    const totalQuestions = totalCorrect + totalInCorrect;
    
    if (totalQuestions === 0) {
      return 0;
    }

    return (totalCorrect / totalQuestions) * 100;
  }
 
  getGradeClass(grade: string) {
    console.log("grade", grade)
    return {
      'grade-high': grade === 'A+' || grade === 'A',
      'grade-medium': grade === 'B' || grade === 'B+',
      'grade-ok': grade === 'C' || grade === 'C+',
      'grade-low': grade === 'D',
      'grade-poor': grade === 'F'
    };
  }
 
  getSubjectClass(subject: string) {
    return {
      'Math': subject === 'Math',
      'Physics': subject === 'Physics',
      'Chemistry': subject === 'Chemistry',
      'Biology': subject === 'Biology'
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