import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge-room-page',
  templateUrl: './challenge-room.component.html',
  styleUrls: ['./challenge-room.component.scss']
})
export class ChallengeRoomPageComponent {
  showModal = false;

  openModal() {
    console.log("Fwefewwe")
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
