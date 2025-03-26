import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengeService } from '../services/challenge.service';
import { ActivatedRoute } from '@angular/router';
import { DifficultyLevel } from 'src/app/enums/difficulty-level.enum';

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
  difficulty: DifficultyLevel = DifficultyLevel.Easy;
  challengeTime: string = '';
  challengeName: string = '';
  grade: string = '';
  totalMarksOfEachCorrectAnswer: number = 0;

  studentResultData = {
    obtainedGrade: "", // Default empty string
    GradeMessage: "", // Default empty string
    MaxMark: 0, // Default 0
    MarkObtained: 0, // Default 0
    IncorrectAnswer: 0, // Default 0
    UnattemptedQuestions: 0, // Default 0
    PercentageScored: 0,// Default 0,
    Recommendations: " "
  };




  // Timer related
  totalTimeInSeconds: number = 0;
  timeLeft: string = '';
  private timerInterval: any;

  ngOnInit(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const challengeId = this.route.snapshot.paramMap.get('id');

    if (challengeId) {
      this.fetchChallengeData(challengeId);
    } else {
      console.error("No challenge ID found in route!");
    }
    this.startTimer();
  }


  constructor(private challengeService: ChallengeService, private route: ActivatedRoute) {

  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  fetchChallengeData(challengeId: string) {
    this.challengeService.getQuestion(challengeId).subscribe({
      next: (response: any) => {
        debugger;
        if (response.questionCollections) {
          this.questions = response.questionCollections;
          const difficultyStr = response.questionDetails.difficultyLevel;
          this.difficulty = this.mapDifficultyLevel(difficultyStr);

          const totalTime = response.questionDetails.totalTimeInMin;
          this.challengeTime = totalTime ? `${totalTime} Minutes` : '30 Minutes';
          this.totalTimeInSeconds = totalTime ? totalTime * 60 : 30 * 60;

          this.challengeName = response.questionDetails.challengeName || "";
          this.maxMarks = response.questionCollections.length * response.questionDetails.totalMarksOfEachCorrectAnswer;
          this.negativeMarking = response.questionDetails.totalMarksDeductforEachWrongAnswer;
          this.grade = response.questionDetails.grade || '';
          this.totalMarksOfEachCorrectAnswer = response.questionDetails.totalMarksOfEachCorrectAnswer;


        } else {
          console.error("Invalid response structure", response);
        }
      },
      error: (err) => {
        console.error("Error fetching challenge questions:", err);
      }
    });
  }

  startTimer() {
    this.updateTimeDisplay();
    this.timerInterval = setInterval(() => {
      if (this.totalTimeInSeconds > 0) {
        this.totalTimeInSeconds--;
        this.updateTimeDisplay();
      } else {
        clearInterval(this.timerInterval);
        this.timeLeft = '00:00';
        this.openResultModal();
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
    debugger;
    console.log('Selected answers:', this.answers);

    const formattedAnswers = this.questions.map((questionData, index) => {
      return {
        question: questionData.questionText,
        answer: this.answers.hasOwnProperty(index) ? this.answers[index] : "", // If answered, take the answer, else empty string
        isCorrect: false, // Default to false, actual correctness will be determined on the backend
        hint: "", // Placeholder, backend will fill if needed
        options: questionData.options
      };
    });

    const payload = {
      guid: this.route.snapshot.paramMap.get('id'),
      grade: this.grade,
      answers: formattedAnswers
    };

    console.log('Payload:', payload);

    this.challengeService.saveUserAnswer(payload).subscribe({
      next: (response) => {
        console.log("Response from API:", response);

        // Mapping response to studentResultData
        this.studentResultData = {
          obtainedGrade: response.grade, // Grade received from response
          GradeMessage: this.getGradeMessage(response.grade), // Message based on grade
          MaxMark: this.maxMarks,
          MarkObtained: response.totalCorrect * this.totalMarksOfEachCorrectAnswer, // Correct answers count
          IncorrectAnswer: response.totalInCorrect,
          UnattemptedQuestions: response.totalNotAttempt, // Not attempted questions count
          Recommendations: response.aiRecommendation.toString().replace('\n', '<br><br>'),
          PercentageScored:this.calculatePercentageScored()
        };
        console.log("Mapped studentResultData:", this.studentResultData);

        this.showResult = true;
        this.showModal = false;
        clearInterval(this.timerInterval);
      },
      error: (err) => {
        console.error("Error submitting results:", err);
      }
    });
  }

  calculatePercentageScored(): number {
    const totalCorrect = this.studentResultData.MarkObtained / this.totalMarksOfEachCorrectAnswer;
    const totalIncorrect = this.studentResultData.IncorrectAnswer;
    const totalNotAttempted = this.studentResultData.UnattemptedQuestions;
  
    const totalQuestions = totalCorrect + totalIncorrect + totalNotAttempted;
    const totalMarks = totalQuestions * this.totalMarksOfEachCorrectAnswer;
  
    const negativeMarks = totalIncorrect * this.negativeMarking;
    const actualMarks = this.studentResultData.MarkObtained - negativeMarks;
  
    const percentage = (actualMarks / totalMarks) * 100;
  
    return Math.max(0, Math.round(percentage)); // Ensures no negative %, rounded off
  }
   
  closeResultModal() { this.showResult = false; }
  goToQuestion(index: number) { this.currentQuestionIndex = index; }
  selectAnswer(questionIndex: number, selectedOption: string) {
    this.answers[questionIndex] = selectedOption.toUpperCase();
  }
  getOptionKeys(index: number): string[] {
    return Object.keys(this.questions[index]?.options || {});
  }
  getAttemptedCount(): number {
    return Object.keys(this.answers).length;
  }

  mapDifficultyLevel(level: number): DifficultyLevel {
    const mapping: { [key: number]: DifficultyLevel } = {
      0: DifficultyLevel.Easy,
      1: DifficultyLevel.Medium,
      2: DifficultyLevel.Hard,
      3: DifficultyLevel.Advanced
    };

    return mapping[level]
  }

  getGradeMessage(grade: string): string {
    switch (grade) {
      case 'A+':
        return "Excellent!! You're mastering it like a pro!";
      case 'A':
        return "Great job! Just a few steps away from perfection!";
      case 'B+':
        return "Well done! A little polish and you'll shine even brighter!";
      case 'B':
        return "Good effort! Keep practicing and you’ll level up in no time.";
      case 'C+':
        return "You're getting there! Don’t stop, growth is happening!";
      case 'C':
        return "Every champion was once a beginner—keep pushing!";
      default:
        return "Keep going! Every attempt makes you stronger!";
    }
  }
}
