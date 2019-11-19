import {Component,OnInit} from '@angular/core';
//Declara jquery y $ para poder utilizar
import * as $ from 'jquery';

@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls:['./tienda.component.css']
})  //definir componente
export class TiendaComponent implements OnInit{
    public titulo;
    public nombreDelParque;
    public miParque;
    constructor(){
        this.titulo ='Esta es la tienda';
    }
    ngOnInit(){
      $('#textojq').hide();
      $('#botonjq').click(function(){
        $('#textojq').slideToggle();
      });
    }
    mostrarNombre(){
      console.log(this.nombreDelParque);
    }
    verDatosParque(event){
      console.log(event);
      this.miParque = event;
    }
}
//Para q los componentes funcionen se debe dar de alta en  app module.ts
// OUTPUT datos de hijo a padre
// ONCHANGE -> implementa para observar los cambios sobre el componente, se debe implementar y crear funcion ngOnChange
//ONINIT -> Se ejecuta cada vez q se carga el compoennte x primera vez
//DOCHECK DETECTA CAMBIOS EN LOS COMPONENTE