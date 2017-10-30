import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from '../../servicios/registro.service';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-edit-registro',
  templateUrl: './edit-registro.component.html',
  styleUrls: ['./edit-registro.component.css']
})
export class EditRegistroComponent implements  OnInit {
  public user;
  constructor(private _registro: RegistroService, private _login: LoginService) {
    // this.user = this._login.getIdentity().user;
    this._registro.viewUser();
  }
  ngOnInit(): void {
    this._registro.editUser$.subscribe(data => {
      this.user = data;
     });
  }

  updateUser() {
    this._registro.updateRegistro(this.user);
  }

}
