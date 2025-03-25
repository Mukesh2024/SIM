import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AiAnalysisComponent } from '../view-ai-analysis/view-ai-analysis.component';

@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.scss']
})
export class MyChallengeComponent  {
  constructor(private dialog: MatDialog) {}
  challenges = [
    { title: 'Trigonometry & Angles Mastery', subject: 'Maths', date: 'Yesterday', grade: 'A+' },
    { title: 'Advanced Calculus Challenge', subject: 'Maths', date: 'Yesterday', grade: 'A' },
    { title: 'Number Systems & Arithmetic Reasoning', subject: 'Maths', date: '2 Days ago', grade: 'B+' },
    { title: 'Statistics & Probability Assessment', subject: 'Maths', date: '3 Days ago', grade: 'C+' },
    { title: 'Newton’s Laws & Motion Principles', subject: 'Physics', date: 'A week ago', grade: 'F' },
    { title: 'Periodic Table & Chemical Reactions', subject: 'Chemistry', date: 'A week ago', grade: 'A' },
    { title: 'Human Anatomy & Biological Systems', subject: 'Bio', date: 'A week ago', grade: 'B' },
    { title: 'Electromagnetism', subject: 'Physics', date: 'Last Month', grade: 'C' },
    { title: 'Earth & Space Science Exploration', subject: 'Physics', date: 'Last Month', grade: 'D+' },
    { title: 'Pagination works', subject: 'Maths', date: 'Yesterday', grade: 'A+' },
  ];
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
