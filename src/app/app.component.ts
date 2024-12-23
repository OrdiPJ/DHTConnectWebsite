import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from "./tool-bar/tool-bar.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToolBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DHTConnectWebsiteFront';
}
