import { computed, effect, Injectable, signal } from '@angular/core';

export interface AppTheme {
  name: 'light' | 'dark' | 'system',
  displayName: string,
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  appTheme = signal<'light' | 'dark' | 'system'>((localStorage.getItem('appTheme') as 'light' | 'dark' | 'system') || 'system');

  themes: AppTheme[] = [
    {
      name: 'light',
      displayName: "Clair",
      icon: 'light_mode'
    },
    {
      name: 'dark',
      displayName: "Sombre",
      icon: 'dark_mode'
    },
    {
      name: 'system',
      displayName: 'Système',
      icon: 'brightness_4'
    }
  ];

  selectedTheme = computed(() => {
     return this.themes.find((theme) => theme.name === this.appTheme());
  });

  getThemes() {
    return this.themes;
  }

  setTheme(name: 'light' | 'dark' | 'system') {
    this.appTheme.set(name);
    localStorage.setItem('appTheme', name);
  }

  setAppTheme = effect(() => {
    const appTheme = this.appTheme();
    const colorScheme = appTheme === 'system' ? 'light dark' : appTheme;
    document.documentElement.style.colorScheme = colorScheme;
  });

  constructor() { }
}
