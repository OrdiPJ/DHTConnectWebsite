import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogComponent } from '../home-page/download-dialog/download-dialog.component';
import { RouterModule } from '@angular/router';
import { ResponsiveService } from '../services/responsive.service';

@Component({
    selector: 'app-tool-bar',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        RouterModule
    ],
    templateUrl: './tool-bar.component.html',
    styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  constructor(private themeService: ThemeService, public responsiveService: ResponsiveService) {  }
  isDarkTheme = false;
  private themeSubscription!: Subscription;
  switchTheme() {
    this.themeService.switchTheme();
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      height: '450px'
    });
  }
}
