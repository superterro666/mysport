import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';


@Injectable()
export class LoginService {

  private url_base = 'http://localhost/mysport/web/app_dev.php/login';
  private url_checktoken = 'http://localhost/mysport/web/app_dev.php/checktoken';
  private token: string;
  private identity: any;

  private loginSource = new Subject<boolean>();
  public isLogin$ = this.loginSource.asObservable();
  private checkTokenSource = new Subject<boolean>();
  public checkToken$ = this.checkTokenSource.asObservable();



  constructor(private http: HttpClient, private router: Router) { }

  login(user: string, password: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const json = { user: user, password: password };
    const data = JSON.stringify(json);
    const params = 'json=' + data;
    this.http.post(this.url_base, params, { headers: headers }).subscribe( data => {

      if (data['code'] === 200) {
        this.setToken(data['token']);
        this.setIdentity(data['user']);
        this.loginSource.next(true);
        return;
      }
      this.loginSource.next(false);
      return;

    }, error => {
      console.log(error);
    });
  }

  checktoken() {
    this.http.get(this.url_checktoken + '?token=' + this.getToken()).subscribe(data => {
      if (data['code'] === 200) {
        console.log(200)
        this.checkTokenSource.next(true);
      } else {
        this.checkTokenSource.next(false);
        console.log(400)
      }
    }, error => {
      console.log(error);
    });
  }


  isSession() {
    if (localStorage.getItem('token') && localStorage.getItem('identity')) {
      if (localStorage.getItem('identity') !== 'undefined' || localStorage.getItem('token') !== 'undefined') {
        const identity = JSON.parse(localStorage.getItem('identity'));
        const token = localStorage.getItem('token');
        this.checktoken();
      }
    }
  }

  logout() {
    if (localStorage.getItem('token') && localStorage.getItem('identity')) {
      localStorage.removeItem('token');
      localStorage.removeItem('identity');
      localStorage.removeItem('psw');
     }
     this.loginSource.next(false);
     this.router.navigate(['/home']);
  }

  setToken(value: string) {
    const token = JSON.stringify(value);
    localStorage.setItem('token', token);
    return;
  }

  setIdentity(value: string) {
    const identity = JSON.stringify(value);
    localStorage.setItem('identity', identity);
    return;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !== undefined) {
      this.token = token;
      return token;
    }
    return this.token = null;
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== undefined) {
      this.identity = identity;
      return identity;
    }
    return this.identity = null;
  }


}


