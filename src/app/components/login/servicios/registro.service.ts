import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../../modelos/user.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class RegistroService {
  private url = 'http://localhost/mysport/web/app_dev.php/';
  private set_registro: string = this.url + 'set/user';
  private update_registro: string = this.url + 'update/user';
  private delete_registro: string = this.url + 'delete/user';
  private view_user: string = this.url + 'view/user';
  private views_users: string = this.url + 'views/users';
  private user_exist: string = this.url + 'user/exist';

  private registroSource = new Subject<any>();
  public goodRegistro$ = this.registroSource.asObservable();

  private pswSource = new Subject<boolean>();
  public pswGood$ = this.pswSource.asObservable();

  private userSource = new Subject<boolean>();
  public userGood$ = this.userSource.asObservable();

  private userData = new Subject<User>();
  public userData$ = this.userData.asObservable();

  private editUserSource = new BehaviorSubject<string>('');
  public editUser$ = this.editUserSource.asObservable();



  constructor(private http: HttpClient, private _loginService: LoginService, private router: Router) { }

  setRegistro(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const data = JSON.stringify(user);
    const params = 'json=' + data;
    this.http.post(this.set_registro, params, { headers: headers }).subscribe( data => {
        if (data['code'] === 200) {
        this.registroSource.next(false);
       // localStorage.setItem('token', JSON.stringify(data['token']));
       // localStorage.setItem('identity', JSON.stringify(data['user']));
        this.router.navigate(['/home']);

      } else {
        this.registroSource.next(false);
      }
    });
  }

  updateRegistro(user: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const userData = {
      user: user,
      sha: this._loginService.getIdentity().id
    }
    const data = JSON.stringify(userData);

    const params = 'json=' + data + '&token=' + this._loginService.getToken();
    this.http.put(this.update_registro, params, { headers: headers }).subscribe( data => {

      if (data['code'] === 200) {
        localStorage.setItem('identity', JSON.stringify(data['user']));
        this.registroSource.next(true);
        this.router.navigate(['/home']);
      } else {
        console.log(data);
        this.registroSource.next(false);
      }
    });
  }

  deleteRegistro() { }

  viewUser() {
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:curly
    if (this._loginService.getIdentity() && this._loginService.getToken()) {
      this.http.get<User>(this.view_user + '?id=' + this._loginService.getIdentity().id +
        '&token=' + this._loginService.getToken()).subscribe(data => {
          this.editUserSource.next(data.user);
        });
    }
  }


  viewsUsers() { }

  goodUser(user: string) {
    this.http.get(this.user_exist + '?user=' + user).subscribe(data => {
      if (data) {
        this.userSource.next(true);
      } else {
        this.userSource.next(false);
      }
    }, error => {
      console.log(error);
    });
  }

  goodPsw(psw: string, psw2: string) {
    if (psw === psw2) {
      this.pswSource.next(false);
    } else {
      this.pswSource.next(true);
    }
  }

}
