import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(this.getSystemTheme());
  isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  constructor() {
    this.applyTheme(this.isDarkThemeSubject.value);  // Applique le thème au chargement
  }

  private getSystemTheme(): boolean {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  switchTheme() {
    const newTheme = !this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(newTheme);
    this.applyTheme(newTheme);
  }

  private applyTheme(isDarkTheme: boolean) {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }
}
  /*isDarkThemeSubject = new BehaviorSubject<boolean>(this.getSystemTheme());
  constructor() {
    if (window.matchMedia("(prefers-color-scheme: dark)")) {
      this.isDarkTheme = true
      document.documentElement.classList.add('dark');
      let toolbar = document.querySelector('mat-toolbar');
      toolbar?.classList.add('dark');
    } else {
      this.isDarkTheme = false
      document.documentElement.classList.add('light');
      let toolbar = document.querySelector('mat-toolbar');
      toolbar?.classList.add('light');
    }
  }

  switchTheme() {
    if (this.isDarkTheme) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      let toolbar = document.querySelector('mat-toolbar');
      toolbar?.classList.remove('dark');
      toolbar?.classList.add('light');
      this.isDarkTheme = false;
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      let toolbar = document.querySelector('mat-toolbar');
      toolbar?.classList.remove('light');
      toolbar?.classList.add('dark');
      this.isDarkTheme = true;
    }
  }*/
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

