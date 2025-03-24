import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-with-ai',
  templateUrl: './learn-with-ai.component.html',
  styleUrls: ['./learn-with-ai.component.scss'],
})
export class LearnWithAiComponent {
  searchText: string = '';
  //filteredTopics: { name: string; topics: string[] }[] = [];

  learningTopics = [
    {
      name: 'Mathematics',
      topics: [
        'Limits & Continuity',
        'Differentiation',
        'Applications of Derivatives',
        'Integration',
      ],
    },
    {
      name: 'Physics',
      topics: [
        "Laws of Motion (Newton's Laws)",
        'Thermal Expansion',
        'Laws of Thermodynamics',
        'Specific Heat & Calorimetry',
      ],
    },
    {
      name: 'Chemistry',
      topics: [
        'Periodic Table',
        'Biochemistry',
        'Organic Chemistry',
        'Temperature Difference',
      ],
    },
    {
      name: 'Biology',
      topics: [
        'The Basics of a Cell',
        'DNA & Protein',
        'Galvanic Basis',
        'Reproduction',
      ],
    },
  ];
  filteredTopics = [...this.learningTopics];
  filterTopics(searchText: string) {
    if (!searchText) {
      this.filteredTopics = [...this.learningTopics];
      return;
    }

    searchText = searchText.toLowerCase();

    this.filteredTopics = this.learningTopics
      .map((category) => ({
        name: category.name,
        topics: category.topics.filter((topic) =>
          topic.toLowerCase().includes(searchText)
        ),
      }))
      .filter((category) => category.topics.length > 0);
  }
}