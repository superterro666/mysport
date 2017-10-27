import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

// SERVICES
import { LoginService } from './components/login/servicios/login.service';
import { RegistroService } from './components/login/servicios/registro.service';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { APP_ROUTING } from './app.routes';
import { LoginComponent } from './components/login/login/login.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { EditRegistroComponent } from './components/login/registro/edit-registro.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    EditRegistroComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService, RegistroService],
  bootstrap: [AppComponent],
})
export class AppModule { }
