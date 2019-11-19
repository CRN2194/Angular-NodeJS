//Importar todos los modulos que se ocuparan
import{NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'; //es necesario para utilizar ngmodels entre otros
//Importar componentes
import {GuardarEmailComponent} from './Components/guardar-email/guardar-email.component';
import {MostrarEmailComponent} from './Components/mostrar-email/mostrar-email.component';
import {MainEmailComponent} from '../component/main-email/main-email.component';

//Nuevo módulo NgModule para cargar componentes y la configuracion del módulo
@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations:[
        GuardarEmailComponent,
        MostrarEmailComponent,
        MainEmailComponent
        
    ],
    exports: [MainEmailComponent]

})
export class ModuloEmailModule{}
