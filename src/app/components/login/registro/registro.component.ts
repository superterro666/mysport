import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from '../servicios/registro.service';
import { NgForm } from '@angular/forms';
import { User } from '../modelo/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroComponent implements OnInit, DoCheck {
  private pswGood: boolean;
  private register: any;
  private userGood: boolean;
  private password2: string;
  private user: User;
  private active: boolean;

  constructor(private _registroService: RegistroService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) {
    this.user = new User(0, '' , '' , 'null');

      this.route.params.subscribe(params => {
      if (params['id'] === 'edit') {
          this._registroService.viewUser();
          this.active = true;
        }
     })
  }

  ngOnInit() {
    this._registroService.userData$.subscribe(data => {
    this.user.user = data.user;
    this.cdRef.markForCheck();
  })
  }

  ngDoCheck() {
    this._registroService.pswGood$.subscribe(data => {
    this.pswGood = data;
    this.cdRef.markForCheck();
 });
 }

  userExist() {
    this._registroService.goodUser(this.user.user);
    this._registroService.userGood$.subscribe(data => {
    this.userGood = data;
    });
  }


  registro(registroForm: NgForm) {
    this._registroService.goodPsw(this.user.password, this.password2);
    if (!this.pswGood) {
        this.user = registroForm.value;
        this._registroService.setRegistro(this.user);
        this._registroService.goodRegistro$.subscribe(data => {

          if (data) {
            console.log('se registro correctamente')
          } else {
            console.log('Fallo al registrarese');
          }

        })
      }
  }

  updateUser() {
    this._registroService.updateRegistro(this.user.user);
  }




}
