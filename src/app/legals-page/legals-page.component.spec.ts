import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalsPageComponent } from './legals-page.component';

describe('LegalsPageComponent', () => {
  let component: LegalsPageComponent;
  let fixture: ComponentFixture<LegalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
