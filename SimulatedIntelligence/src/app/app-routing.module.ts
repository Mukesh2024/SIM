import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ChallengeRoomPageComponent } from './component/challenge-room/challenge-room.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'challenge/:id', component: ChallengeRoomPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
