import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BuildSensorPageComponent } from './build-sensor-page/build-sensor-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'construire-un-capteur', component: BuildSensorPageComponent }
];
