import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnDestroy {
  destroyed = new Subject<void>();
  //currentScreenSize: string;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            //this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
