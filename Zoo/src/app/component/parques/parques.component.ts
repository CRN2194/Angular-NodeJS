import {Component,Input,Output, EventEmitter} from '@angular/core';//Input para q se pueda llamar desde el padre
@Component({
  selector: 'parques',
  templateUrl: './parques.component.html'

})  //definir componente
export class ParquesComponent{
    @Input() nombre: string;
    public metros: number;
    public vegetacion:string;
    public abierto: boolean;
    @Output() pasameLosDatos = new EventEmitter(); //permite ejecutar eventos por fuera
    constructor(){
        this.nombre ='Parque natural para caballos';
        this.metros = 450;
        this.vegetacion ='Alta';
        this.abierto = false;
    }
    emitirEvento(){
      this.pasameLosDatos.emit({
        'nombre': this.nombre,
        'metros': this.metros,
        'vegetacion':this.vegetacion,
        'abierto': this.abierto
      });
    }
}
//@input envia info de un padra a hijo