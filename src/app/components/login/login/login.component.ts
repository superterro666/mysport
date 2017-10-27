import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from '../servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],


})
export class LoginComponent implements OnInit {
  private user: string;
  private password: string;

  constructor(private _loginService: LoginService) { }

  submit() {
    if (this.user && this.password) {
      if (this.user.length >= 1 && this.password.length >= 5) {
          this._loginService.login(this.user, this.password);
      }
 }

  }

  ngOnInit() {
    this.isRecordPsw();
  }


  recordPsw(e) {
    if (e.target.checked) {
      const psw = btoa(this.password);
      localStorage.setItem('psw', psw);
    } else {
      localStorage.removeItem('psw');
    }
  }

  isRecordPsw() {
    if (localStorage.getItem('psw')) {
      const value = localStorage.getItem('psw');
      const daro = atob(value);
      this.password = daro;
    }
  }

  logout() {
    this._loginService.logout();
  }
}
