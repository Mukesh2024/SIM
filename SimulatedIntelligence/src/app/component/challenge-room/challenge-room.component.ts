import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-challenge-room-page',
  templateUrl: './challenge-room.component.html',
  styleUrls: ['./challenge-room.component.scss']
})
export class ChallengeRoomPageComponent implements OnInit, OnDestroy {
  showModal = false;
  showResult = false;
  currentQuestionIndex: number = 0;

  questions: any[] = [];
  answers: { [key: number]: string } = {};

  maxMarks: number = 10;
  negativeMarking: number = 0;
  difficulty: string = 'Easy';
  challengeTime: string = '30 Minutes';

  // Timer related
  totalTimeInSeconds: number = 30 * 60; // 30 minutes
  timeLeft: string = '';
  private timerInterval: any;

  ngOnInit(): void {
    this.questions = this.mockData.questionCollections;
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  startTimer() {
    this.updateTimeDisplay(); // initial display
    this.timerInterval = setInterval(() => {
      if (this.totalTimeInSeconds > 0) {
        this.totalTimeInSeconds--;
        this.updateTimeDisplay();
      } else {
        clearInterval(this.timerInterval);
        this.timeLeft = '00:00';
        this.openResultModal(); // Auto-submit when time is up
      }
    }, 1000);
  }

  updateTimeDisplay() {
    const minutes = Math.floor(this.totalTimeInSeconds / 60);
    const seconds = this.totalTimeInSeconds % 60;
    this.timeLeft = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }
  openResultModal() {
    this.showResult = true;
    this.showModal = false;
    clearInterval(this.timerInterval);
  }
  closeResultModal() { this.showResult = false; }
  goToQuestion(index: number) { this.currentQuestionIndex = index; }
  selectAnswer(questionIndex: number, selectedOption: string) {
    this.answers[questionIndex] = selectedOption;
  }
  getOptionKeys(index: number): string[] {
    return Object.keys(this.questions[index]?.options || {});
  }
  getAttemptedCount(): number {
    return Object.keys(this.answers).length;
  }

  // Mock quiz data
  mockData = {
    guid: "00000000-0000-0000-0000-000000000000",
    questionCollections: [
      {
        questionText: "What is the sum of the roots of the equation x² - 5x + 6 = 0?",
        options: { a: "5", b: "-5", c: "6", d: "-6" },
        answer: null,
        explanation: null
      },
      {
        questionText: "Which of the following is a polynomial?",
        options: { a: "3x² - 4x + 2", b: "1/x", c: "√x", d: "ln(x)" },
        answer: null,
        explanation: null
      },
      {
        questionText: "What is the standard form of a linear equation?",
        options: { a: "ax + by = c", b: "ax² + by = c", c: "a/b = x", d: "x + y + z = 0" },
        answer: null,
        explanation: null
      },
      {
        questionText: "Which formula gives the roots of the quadratic equation ax² + bx + c = 0?",
        options: {
          a: "x = (-b ± √(b² - 4ac)) / 2a",
          b: "x = -(b/a)",
          c: "x = c/b",
          d: "x = √(b/a)"
        },
        answer: null,
        explanation: null
      },
      {
        questionText: "According to Newton's first law of motion, what will happen to an object at rest?",
        options: {
          a: "It will remain at rest.",
          b: "It will accelerate.",
          c: "It will move in a circular path.",
          d: "It will eventually fall."
        },
        answer: null,
        explanation: null
      },
      {
        questionText: "What does the second law of thermodynamics state?",
        options: {
          a: "Energy is conserved.",
          b: "Entropy of an isolated system always increases.",
          c: "Heat is always transferred from cold to hot.",
          d: "Work can be converted into heat with no loss."
        },
        answer: null,
        explanation: null
      },
      {
        questionText: "What is the centripetal force required for an object to move in a circle?",
        options: {
          a: "mv²/r",
          b: "mgh",
          c: "F = ma",
          d: "pV = nRT"
        },
        answer: null,
        explanation: null
      },
      {
        questionText: "What is the main function of the cell membrane?",
        options: {
          a: "Store genetic information.",
          b: "Control the movement of substances in and out of the cell.",
          c: "Provide energy to the cell.",
          d: "Produce proteins."
        },
        answer: null,
        explanation: null
      },
      {
        questionText: "What is a homozygous genotype?",
        options: {
          a: "Having two identical alleles for a trait.",
          b: "Having two different alleles for a trait.",
          c: "Having no alleles for a trait.",
          d: "Having multiple alleles for a trait."
        },
        answer: null,
        explanation: null
      },
      {
        questionText: "What is the highest level of organization in an ecosystem?",
        options: {
          a: "Community",
          b: "Population",
          c: "Organism",
          d: "Biosphere"
        },
        answer: null,
        explanation: null
      }
    ]
  };
}
