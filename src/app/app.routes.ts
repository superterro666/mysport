import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { EditRegistroComponent } from './components/login/registro/edit-registro/edit-registro.component';
import { AuthGuard } from './components/login/servicios/auth-guard.service';
import { AddComponent } from './components/ejercicios/add/add.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'edit-registro',   canActivate: [AuthGuard], component: EditRegistroComponent },
  { path: 'add-ejercicio',   canActivate: [AuthGuard], component: AddComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
