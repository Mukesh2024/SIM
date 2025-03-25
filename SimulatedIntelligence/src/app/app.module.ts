import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { MyDashboardComponent } from './component/sub-component/my-dashboard/my-dashboard.component';
import { MyChallengeComponent } from './component/sub-component/my-challenge/my-challenge.component';
import { MyAchievementsComponent } from './component/sub-component/my-achievements/my-achievements.component';
import { LearnWithAiComponent } from './component/sub-component/learn-with-ai/learn-with-ai.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MyDashboardComponent,
    MyChallengeComponent,
    MyAchievementsComponent,
    LearnWithAiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }