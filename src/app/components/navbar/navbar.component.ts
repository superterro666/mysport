import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LoginService } from '../login/servicios/login.service';
import { RegistroService } from '../login/servicios/registro.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, DoCheck, OnDestroy {

  public logueado: boolean;
  private endCheckToken: Subscription = null;
  private endIsLogin: Subscription = null;
  private endRegistro: Subscription = null;


  constructor(public _login: LoginService,
    private _registro: RegistroService,
    private cdRef: ChangeDetectorRef) {

  }

  ngDoCheck() {
    this.endCheckToken = this._login.checkToken$.subscribe(data => {
      this.logueado = data;
      this.cdRef.markForCheck();
      });
    this.endIsLogin = this._login.isLogin$.subscribe(data => {
      this.logueado = data;
      this.cdRef.markForCheck();
    });

    this.endRegistro = this._registro.goodRegistro$.subscribe(data => {
      this.logueado = data;
      this.cdRef.markForCheck();
    })

  }
  ngOnInit() {
    this._login.isSession();
 }

 ngOnDestroy(): void {
  this.endCheckToken.unsubscribe();
  this.endIsLogin.unsubscribe();
  this.endRegistro.unsubscribe();
}

}
