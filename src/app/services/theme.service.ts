import { computed, effect, Injectable, signal } from '@angular/core';

export interface AppTheme {
  name: 'light' | 'dark' | 'system',
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  appTheme = signal<'light' | 'dark' | 'system'>('system');

  themes: AppTheme[] = [
    {
      name: 'light',
      icon: 'light_mode'
    },
    {
      name: 'dark',
      icon: 'dark_mode'
    },
    {
      name: 'system',
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
  }

  setAppTheme = effect(() => {
    const appTheme = this.appTheme();
    const colorScheme = appTheme === 'system' ? 'light dark' : appTheme;
    document.documentElement.style.colorScheme = colorScheme;
  });

  constructor() { }
}
