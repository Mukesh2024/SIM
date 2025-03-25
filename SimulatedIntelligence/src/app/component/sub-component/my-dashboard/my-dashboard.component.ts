import { Component } from '@angular/core';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent {
  recentChallenges = [
    {
      title: 'Trigonometry & Angles Mastery',
      grade: 'A+',
      date: '2 Days ago',
      image: 'assets/trigonometry.jpg'
    },
    {
      title: 'Human Anatomy & Biology',
      grade: 'D',
      date: '1 week ago',
      image: 'assets/biology.jpg'
    },
    {
      title: 'Human Anatomy & Biology',
      grade: 'D',
      date: '5 week ago',
      image: 'assets/biology.jpg'
    }
  ];
 //recentChallenges object- title, grade, date, image
 //expertiseTopics object- title, subject, questions, accuracy
 //getGradeClass- grade
 //getSubjectClass- subject
  expertiseTopics = [
    { title: 'Trigonometry & Angles Mastery', subject: 'Maths', questions: 100, accuracy: 100 },
    { title: 'Advanced Calculus', subject: 'Maths', questions: 89, accuracy: 90 },
    { title: 'Newton’s Laws & Motion Principles', subject: 'Physics', questions: 88, accuracy: 82 },
    { title: 'Periodic Table & Chemical Reactions', subject: 'Physics', questions: 67, accuracy: 66 }
  ];
 
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