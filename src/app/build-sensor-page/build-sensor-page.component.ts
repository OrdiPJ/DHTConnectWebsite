import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-build-sensor-page',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './build-sensor-page.component.html',
  styleUrl: './build-sensor-page.component.scss',
})
export class BuildSensorPageComponent {
  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

  constructor(public responsiveService: ResponsiveService) { }

}
