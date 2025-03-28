import { Component, EventEmitter, Output } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent {
  @Output() closeEvent = new EventEmitter<void>();
  currentStep: number = 1;

  /**
   *
   */
  constructor(private challengeService: ChallengeService, private router: Router) {

  }

  subjects = [
    { id: 1, name: "Mathematics", isSelected: true, topics: ["Linear Equations", "Quadratic Equations", "Polynomials", "Algebraic Expressions"] },
    { id: 2, name: "Physics", isSelected: false, topics: ["Laws of Motion (Newton's Laws)", "Circular Motion & Gravitation", "Laws of Thermodynamics", "Motion in a Straight Line"] },
    { id: 3, name: "Chemistry", isSelected: false, topics: ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Organic Chemistry Basics"] },
    { id: 4, name: "Biology", isSelected: false, topics: ["Cell Structure", "Genetics", "Human Anatomy", "Ecology & Environment"] }
  ];

  grades = ["Grade-1", "Grade-2", "Grade-3", "Grade-4", "Grade-5", "Grade-6", "Grade-7", "Grade-8", "Grade-9"]
  ;
  difficultyLevels = [
    { name: "Easy", value: 0 },
    { name: "Medium", value: 1 },
    { name: "Hard", value: 2 },
    { name: "Advanced", value: 3 }
  ];

  selectedTopic: string = "";
  selectedGrade: string = "Grade-9";
  selectedDifficulty: number = 0;
  numOfQuestion: number = 5;
  correctMarks: number = 1;
  negativeMarks: number = 0;
  challengeTime: number = 15;
  challengeName: string = "";
  allowAIGuidance: boolean = false;

  loader = false;


  getDefaultTopics(): string[] {
    return this.subjects
      .filter(subject => subject.isSelected)
      .flatMap(subject => subject.topics);
  }

  getSelectedSubjectsText(): string {
    const selectedNames = this.subjects.filter(x => x.isSelected).map(x => x.name);
    return selectedNames.length > 0 ? `Topics in ${selectedNames.join(", ")}` : "Select a Subject first";
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  closeModal() {
    this.closeEvent.emit();
  }

  submitChallenge() {
    if (this.challengeName === "") {
      alert("Please enter a challenge name");}
      const requestBody = {
        challengeName: this.challengeName,
        subjectAndTopics: this.subjects
          .filter(subject => subject.isSelected)
          .map(subject => ({
            subject: subject.name,
            topic: subject.topics,
          })),
        difficultyLevel: this.selectedDifficulty,
        numberOfQuestion: this.numOfQuestion * this.subjects.filter(subject => subject.isSelected).length,
        totalMarksOfEachAnswer: this.correctMarks,
        totalMarksOfEachCorrectAnswer: this.correctMarks,
        totalMarksDeductforEachWrongAnswer: this.negativeMarks,
        totalTimeInMin: this.challengeTime,
        grade: this.selectedGrade,
        allowAIGuidence: this.allowAIGuidance
      };
      this.loader = true;
      this.challengeService.submitChallenge(requestBody).subscribe({
        next: response => {
          const challengeId = response;
          if (challengeId) {
            this.router.navigate(['/challenge', challengeId]);
          } else {
            console.error("Challenge ID not found in response!");
          }
          this.loader = false;
        },
        error: err => {
          this.loader = false;
          console.error("Challenge submission failed", err);
        }
      });
    }

  }
