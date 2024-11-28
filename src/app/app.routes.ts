import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BuildSensorPageComponent } from './build-sensor-page/build-sensor-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { PostPageComponent } from './post-page/post-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'construire-un-capteur', component: BuildSensorPageComponent },
    { path: 'nous-contacter', component: ContactPageComponent },
    { path: 'news', component: NewsPageComponent },
    { path: 'post', component: PostPageComponent }
];
