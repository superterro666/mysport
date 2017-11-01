import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private status: boolean;
  constructor(private _loginService: LoginService) { }
  canActivate() {
    this._loginService.checktoken();
    // tslint:disable-next-line:curly
    if (this._loginService.checkToken$.subscribe(data => {
        this.status = data;
    }))
    if (this.status !== undefined) {
      return this.status;
    }
    }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}