import { Component,DoCheck,OnInit } from '@angular/core';

@Component({
  selector: 'mostrar-email',
  template: '<h2>{{title}} </h2> <span *ngIf="emailContacto"><strong>Email de contacto </strong>{{emailContacto}}<button (click)="borrarEmail()">EliminarEmail</button></span> ',

})
export class MostrarEmailComponent implements DoCheck,OnInit  {
  title = 'Mostrar email';
  emailContacto: string;
  ngOnInit(){
      this.emailContacto = localStorage.getItem('emailContacto');
  }
  ngDoCheck(){
    this.emailContacto = localStorage.getItem('emailContacto');
    }
  borrarEmail(){
      localStorage.removeItem('emailContacto');
      localStorage.clear();
      this.emailContacto =null;
  }
}
