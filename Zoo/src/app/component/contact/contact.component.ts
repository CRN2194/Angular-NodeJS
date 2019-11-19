import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
  })
  export class ContactComponent implements OnInit {
    title = 'Contacto';
    emailContacto: string;
    ngOnInit(){
        console.log('contact.component cargado');
    }
    guardarEmail(){
      localStorage.setItem('emailContacto',this.emailContacto); //Se puede consultar en cualquier parte, con get se recupera
    }
  }