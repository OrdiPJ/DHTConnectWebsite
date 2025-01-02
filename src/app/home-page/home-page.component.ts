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
export class HomePageComponent {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  currentIndex = 0;
  dots = [0, 1, 2]; // Ajuste en fonction du nombre d'images

  index = 0;

  ngAfterViewInit() {
    this.updateCarousel();
  }

  updateCarousel() {
    const track = this.carouselTrack.nativeElement;
    const slides = Array.from(track.children) as HTMLElement[];
    const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }

  scrollLeft() {
    const track = this.carouselTrack.nativeElement;
    const slides = Array.from(track.children);
    this.currentIndex = (this.currentIndex === 0) ? slides.length - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  scrollRight() {
    const track = this.carouselTrack.nativeElement;
    const slides = Array.from(track.children);
    this.currentIndex = (this.currentIndex === slides.length - 1) ? 0 : this.currentIndex + 1;
    this.updateCarousel();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      height: '450px'
    });
  }

  nextSlide() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const visibleItemIndex = Array.from(items).findIndex(item => {
      const rect = item.getBoundingClientRect();
      return rect.left >=0 && rect.right <= window.innerWidth;
    });

    if (visibleItemIndex !== -1 && visibleItemIndex < items.length -1) {
      items[visibleItemIndex + 1].scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
      });
    } else {
      items[0].scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
      });
    }
  }

  previousSlide() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');

    const visibleItemIndex = Array.from(items).findIndex(item => {
        const rect = item.getBoundingClientRect();
        return rect.left >= 0 && rect.right <= window.innerWidth;
    });

    if (visibleItemIndex > 0) {
        items[visibleItemIndex - 1].scrollIntoView({
            behavior: 'smooth',
            inline: 'start'
        });
    } else {
        // Optionnel : Aller au dernier élément si on est au début
        items[items.length - 1].scrollIntoView({
            behavior: 'smooth',
            inline: 'start'
        });
    }
}

  constructor(public responsiveService: ResponsiveService) {  }
}
