import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentSection: string = '';

  toggleSection(section: string) {
    this.currentSection = (this.currentSection === section) ? '' : section;
  }
}
