import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoginService {

  private url_base: string = "http://localhost/mysport/web/app_dev.php/login";
  private url_checktoken = "http://localhost/mysport/web/app_dev.php/checktoken";
  private token: string;
  private identity: any;
  private loginSource = new Subject<boolean>();
  public isLogin = this.loginSource.asObservable();
  public checkTokenSource = new Subject<boolean>();
  public checkToken = this.checkTokenSource.asObservable();



  constructor(private http: HttpClient) { }

  login(user: string, password: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let json = { user: user, password: password };
    let data = JSON.stringify(json);
    let params = 'json=' + data;
    this.http.post(this.url_base, params, { headers: headers }).subscribe(data => {

      if (data['code'] == 200) {
        this.setToken(data['token']);
        this.setIdentity(data['user']);
        this.loginSource.next(true);
        return;
      }
      this.loginSource.next(false);
      return 

    },error => {
      console.log(error);
    });
  }

  checktoken() {
    this.http.get(this.url_checktoken + "?token=" + this.getToken()).subscribe(data => {
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
    if(localStorage.getItem('token') && localStorage.getItem('identity')){
      let identity = JSON.parse(localStorage.getItem('identity'));
      let token = localStorage.getItem('token');
      if (identity != undefined && token != undefined) {
        this.checktoken();
      }
    }
    
 }

 logout(){
   if(localStorage.getItem('token') && localStorage.getItem('identity')){
     localStorage.removeItem('token');
     localStorage.removeItem('identity');
     localStorage.removeItem('psw');
     this.loginSource.next(false);
   }
 }

  setToken(value: string) {
    let token = JSON.stringify(value);
    localStorage.setItem('token', token);
    return;
  }

  setIdentity(value: string) {
    let identity = JSON.stringify(value);
    localStorage.setItem('identity', identity);
    return;
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token != undefined) {
      this.token = token;
      return token;
    }
   return  this.token = null;;
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != undefined) {
      this.identity = identity;
      return identity;
    }
   return this.identity = null;;
  }


}


