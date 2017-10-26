import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoginService } from "./components/login/servicios/login.service";
import { RegistroService } from './components/login/servicios/registro.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  public logueado: boolean;
  constructor(public _login: LoginService, private _registro: RegistroService, private cdRef: ChangeDetectorRef) {

  }

  ngDoCheck() {
    this._login.checkToken.subscribe(data => {
      this.logueado = data;
      this.cdRef.markForCheck();
      
      });
    this._login.isLogin.subscribe(data => {
      this.logueado = data;
      this.cdRef.markForCheck();
    });

    this._registro.goodRegistro$.subscribe(data =>{
      this.logueado = data;
      this.cdRef.markForCheck();
    })

  }
  ngOnInit() {
    this._login.isSession();
 }


}
