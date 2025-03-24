import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent {
  @Output() closeEvent = new EventEmitter<void>();

  // JSON structure to hold subjects and topics
  subjects = [
    { id: 1, name: "Mathematics", isSelected: true, topics: ["Linear Equations", "Quadratic Equations", "Polynomials", "Algebraic Expressions"] },
    { id: 2, name: "Physics", isSelected: false, topics: ["Laws of Motion (Newton's Laws)", "Circular Motion & Gravitation", "Laws of Thermodynamics", "Motion in a Straight Line"] },
    { id: 3, name: "Chemistry", isSelected: false, topics: ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Organic Chemistry Basics"] },
    { id: 4, name: "Biology", isSelected: false, topics: ["Cell Structure", "Genetics", "Human Anatomy", "Ecology & Environment"] }
  ];

  grades = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

  selectedTopic: string = "";
  selectedGrade:number |null = null;

  // Returns only topics from selected subjects
  getSelectedTopics(): string[] {
    return this.subjects
      .filter(subject => subject.isSelected) // Get only selected subjects
      .flatMap(subject => subject.topics); // Merge topics into one array
  }

  getSelectedSubjectsText(): string {
    const selectedNames = this.subjects.filter(x => x.isSelected).map(x => x.name);
    return selectedNames.length > 0 ? `Topics in ${selectedNames.join(", ")}` : "Select a Subject first";
  }

  closeModal() {
    this.closeEvent.emit();
  }
}
