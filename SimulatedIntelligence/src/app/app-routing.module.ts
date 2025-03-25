import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ChallengeRoomPageComponent } from './component/challenge-room/challenge-room.component';
import { ChallengeReviewComponent } from './challenge-review/challenge-review.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'challenge/:id', component: ChallengeRoomPageComponent },
  { path: 'review-challenge/:id', component: ChallengeReviewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
