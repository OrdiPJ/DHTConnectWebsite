import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogComponent } from '../home-page/download-dialog/download-dialog.component';
import { RouterModule } from '@angular/router';
import { ResponsiveService } from '../services/responsive.service';
import { MatMenuModule } from "@angular/material/menu";

@Component({
    selector: 'app-tool-bar',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        RouterModule,
        MatMenuModule
    ],
    templateUrl: './tool-bar.component.html',
    styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
  readonly dialog = inject(MatDialog);
  constructor(public themeService: ThemeService, public responsiveService: ResponsiveService) {  }
  isDarkTheme = false;
  private themeSubscription!: Subscription;

  openDialog() {
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      height: '450px'
    });
  }
}
