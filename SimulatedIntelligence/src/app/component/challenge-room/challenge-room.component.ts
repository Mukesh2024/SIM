import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge-room-page',
  templateUrl: './challenge-room.component.html',
  styleUrls: ['./challenge-room.component.scss']
})
export class ChallengeRoomPageComponent {
  showModal = false;
  showResult = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openResultModal() {
    this.showResult = true;
  }
  closeResultModal() {
    this.showResult = false;
  }
}
