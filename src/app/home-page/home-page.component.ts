import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  currentIndex = 0;
  dots = [0, 1, 2]; // Ajuste en fonction du nombre d'images

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
}
