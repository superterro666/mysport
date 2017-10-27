import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from '../servicios/registro.service';
import { LoginService } from '../servicios/login.service';
import { NgForm } from '@angular/forms';
import { User } from '../modelo/user.model';

@Component({
  selector: 'app-edit-registro',
  template: `<form class="form-inline">
  <label class="sr-only" for="inlineFormInput">Usuario</label>
  <input type="text" name="user" [(ngModel)]="user" class="form-control mb-2 mr-sm-2 mb-sm-0"
  id="inlineFormInput" placeholder="Usuario">
  <button type="button" class="btn btn-success" (click)="updateUser()" [disabled]="userGood">Actualizar</button>
  </form>`
})
export class EditRegistroComponent {
    private user: any;
    constructor(private _registro: RegistroService, private _login: LoginService) {
      this.user = this._login.getIdentity().user;
    }

    updateUser() {
        this._registro.updateRegistro(this.user);
      }
}
