import { Component } from '@angular/core';

@Component({
  selector: 'app-my-challenge',
  templateUrl: './my-challenge.component.html',
  styleUrls: ['./my-challenge.component.scss']
})
export class MyChallengeComponent  {
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
  currentPage=1;
  getSubjectClass(subject: string) {
    return {
      'maths': subject === 'maths',
      'physics': subject === 'physics',
      'chemistry': subject === 'chemistry',
      'biology': subject === 'biology'
    };
  }
}
