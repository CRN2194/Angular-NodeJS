import { Component,DoCheck,OnInit } from '@angular/core';

@Component({
  selector: 'guardar-email',
  template: `<input type="text" [(ngModel)]="emailContacto" /> 
            <button (click)="guardarEmail()">Guardar Email</button>
  `
})
export class GuardarEmailComponent   {
  title = 'Guardar email';
  emailContacto: string;
    
    guardarEmail(){
        localStorage.setItem('emailContacto',this.emailContacto); //Se puede consultar en cualquier parte, con get se recupera
      }
}
