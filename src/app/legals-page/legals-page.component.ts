import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-legals-page',
  imports: [
    CommonModule
  ],
  templateUrl: './legals-page.component.html',
  styleUrl: './legals-page.component.scss'
})
export class LegalsPageComponent {

  constructor(public responsiveService: ResponsiveService) {  }
}
