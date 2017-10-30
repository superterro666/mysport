import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { EditRegistroComponent } from './components/login/registro/edit-registro/edit-registro.component';
import { AuthGuard } from './components/login/servicios/auth-guard.service';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'edit-registro',   canActivate: [AuthGuard], component: EditRegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
