import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /*private isDarkTheme = false;
  constructor() { 
    this.isDarkTheme = window.matchMedia(('prefers-color-scheme: dark')).matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.isDarkTheme = e.matches;
      this.updateTheme();
    });
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme();
  }

  private updateTheme() {
    const themeClass = this.isDarkTheme ? 'dark' : 'light';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(themeClass);
  }*/
}
