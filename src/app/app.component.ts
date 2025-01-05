import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { ResponsiveService } from './services/responsive.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToolBarComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DHTConnectWebsiteFront';

  getMarginStyle() {
    const screenSize = this.responsiveService.currentScreenSize;
  
    // Déterminez la marge horizontale et la hauteur en fonction de la taille de l'écran
    const isSmallScreen = screenSize === 'Small' || screenSize === 'XSmall';
    
    const marginHorizontal = isSmallScreen ? '5%' : '20%'; // Marge horizontale
    const toolbarHeight = isSmallScreen ? 128 : 64; // Hauteur de la toolbar
  
    // Retournez un objet avec les marges calculées
    return {
      margin: `15px ${marginHorizontal}`, // Marge horizontale + verticale (haut-bas)
      marginTop: `${toolbarHeight + 15}px`, // Addition de la hauteur de la toolbar et des 15px
    };
  }

  constructor(private responsiveService: ResponsiveService) {  }
}
