import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent {
  @Output() closeEvent = new EventEmitter<void>();
  currentStep: number = 3;


  subjects = [
    { id: 1, name: "Mathematics", isSelected: true, topics: ["Linear Equations", "Quadratic Equations", "Polynomials", "Algebraic Expressions"] },
    { id: 2, name: "Physics", isSelected: false, topics: ["Laws of Motion (Newton's Laws)", "Circular Motion & Gravitation", "Laws of Thermodynamics", "Motion in a Straight Line"] },
    { id: 3, name: "Chemistry", isSelected: false, topics: ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Organic Chemistry Basics"] },
    { id: 4, name: "Biology", isSelected: false, topics: ["Cell Structure", "Genetics", "Human Anatomy", "Ecology & Environment"] }
  ];

  grades = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  difficultyLevels = ["Easy", "Medium", "Hard", "Advanced"];

  selectedTopic: string = "";
  selectedGrade: number | null = 1;
  selectedDifficulty: string = "Easy";
  numOfQuestion: number = 5;
  correctMarks: number = 1;
  negativeMarks: number = 0;
  challengeTime: number = 15;
  challengeName: string = "";
  allowAIGuidance: boolean = false;


  getSelectedTopics(): string[] {
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
    console.log("Challenge Submitted", {
      selectedSubjects: this.subjects.filter(s => s.isSelected),
      selectedTopics: this.getSelectedTopics(),
      selectedGrade: this.selectedGrade,
      difficulty: this.selectedDifficulty,
      numQuestions: this.numOfQuestion,
      correctMarks: this.correctMarks,
      negativeMarks: this.negativeMarks,
      challengeName: this.challengeName,
      challengeTime: this.challengeTime,
      allowAIGuidance: this.allowAIGuidance
    });
  }
}
