import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  selectedTab: string = 'dashboard'; // Default selection

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
