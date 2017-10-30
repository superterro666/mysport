import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LoginService } from './components/login/servicios/login.service';
import { RegistroService } from './components/login/servicios/registro.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
}
