import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSensorPageComponent } from './build-sensor-page.component';

describe('BuildSensorPageComponent', () => {
  let component: BuildSensorPageComponent;
  let fixture: ComponentFixture<BuildSensorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildSensorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildSensorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
