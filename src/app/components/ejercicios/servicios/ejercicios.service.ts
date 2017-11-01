import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { LoginService } from '../../login/servicios/login.service';
import { Ejercicio } from '../../../modelos/ejercicio.model';


@Injectable()
export class EjerciciosService {
    private url = 'http://localhost/mysport/';
    private set = 'set/ejercicio?';
    private view = 'view/ejercicio?';
    private views = 'views/ejercicios';
    private update = 'update/ejercicio';
    private delete = 'delete/ejercicio?';
    constructor(private _loginService: LoginService, private http: HttpClient, private router: Router) {

    }
    setEjercicio(datas: Ejercicio) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const data = JSON.stringify(datas);
        const params = 'json=' + data;
        this.http.post(this.set, params, { headers: headers }).subscribe( data => {
            if (data['code'] === 200) {
            this.router.navigate(['/home']);
           } 
        });
    }

    viewsEjercicio(){
        this.http.get<Ejercicio>(this.views + '&token=' + this._loginService.getToken()).subscribe(data => {
          
            
        });
    }
}