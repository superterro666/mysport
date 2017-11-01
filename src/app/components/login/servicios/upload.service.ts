import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { LoginService } from '../services/login.service';
import { Globales } from '../utils/globales';


@Injectable()
export class UploadService {
  public progressBar;
  public url;

  constructor(private _http: Http, private _loginService: LoginService, globales: Globales) {
    this.url = globales.rutaGenerica + '/get/images?id=';
  }

  makeFileRequest(sha, url: string, params: Array<string>, files: Array<File>, tag: any, tag2: any) {
   

  console.log(files);

    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      var name_file_input = params[0];
      for (var i = 0; i < files.length; i++) {
        formData.append(name_file_input, files[i], files[i].name);
      }
      formData.append('authorized', this._loginService.getToken());
      formData.append('sha', sha);
      xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
          console.log(4);
          if (xhr.status == 200) {
            console.log(200);
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      }

      xhr.upload.addEventListener("progress", function (event: any) {
        var percent = (event.loaded / event.total) * 100;
        var prc = Math.round(percent).toString();
        tag.setAttribute("value", prc);
        tag.style.width = prc + "%";
        tag2.innerHTML = Math.round(percent) + " % subido... por favor espera ";

      }, false);


      xhr.addEventListener("load", function () {
        tag2.innerHTML = " Subida completada";
        let prc = "0";
        tag.setAttribute("aria.valuenow", prc);
        tag.style.width = prc + "%";

      }, false);


      xhr.addEventListener("error", function () {
        tag2.innerHTML = " Error en la subida";
      }, false);


      xhr.addEventListener("abort", function () {
        tag2.innerHTML = " Subida abortada";
      }, false);

      
      
      xhr.open('POST', url, true);
      xhr.send(formData);


    });
  }

  getImagen(id, tipo) {
    return this._http.get(this.url + id + '&authorized=' + this._loginService.getToken() + '&tipo=' + tipo ).map(res => res.json());
  }
}
