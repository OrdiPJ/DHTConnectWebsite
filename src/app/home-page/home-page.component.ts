import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-home-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  currentIndex = 0;
  dots = [0, 1, 2]; // Ajuste en fonction du nombre d'images
  items = ['carousel-item-1', 'carousel-item-2', 'carousel-item-3'];

  index = 0;
  carousel: Element | null = null;

  ngOnInit() {
    this.scrollToItem(this.currentIndex);
  }

  scrollToItem(index: number) {
    if (index >= 0 && index < this.items.length) {
      const item = document.querySelector(`.carousel-item-${index + 1}`);
      item?.scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
      });
      this.currentIndex = index;
    }
  }

  onScroll(carousel : HTMLElement) {
    const carouselRect = carousel.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;
    this.items.forEach((_, index) => {
      const item = document.querySelector(`.carousel-item-${index + 1}`);
      const itemRect = item?.getBoundingClientRect();
      const distance = Math.abs((itemRect?.left || 0) - carouselRect.left);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });
    this.currentIndex = closestIndex;
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      height: '450px'
    });
  }

  constructor(public responsiveService: ResponsiveService) { }
}
