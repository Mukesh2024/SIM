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

  mapDifficultyLevel(level: number): DifficultyLevel {
    const mapping: { [key: number]: DifficultyLevel } = {
      0: DifficultyLevel.Easy,
      1: DifficultyLevel.Medium,
      2: DifficultyLevel.Hard,
      3: DifficultyLevel.Advanced
    };

    return mapping[level]
  }
}
