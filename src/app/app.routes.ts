import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegistroComponent } from './components/login/registro/registro.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro/:id', component: RegistroComponent},
  
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
