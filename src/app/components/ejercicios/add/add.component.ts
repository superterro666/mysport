import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../../../modelos/ejercicio.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  private ejercicio: Ejercicio;
  constructor() {
    this.ejercicio = new Ejercicio('', 0 , 0);
  }

 submit(ejercicio: NgForm) {
  if (ejercicio.valid) {
      console.log('valid');
  }
 }

}
