import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Componentes
import {TiendaComponent} from './component/tienda/tienda.component';
import {AnimalsComponent} from './component/animals/animals.component';
import {ContactComponent} from './component/contact/contact.component';
import {HomeComponent} from './component/home/home.component';
import {KeepersComponent} from './component/keepers/keepers.component';
//componen login y registro
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';
//edicion usuario
import {UserEditComponent} from './component/user-edit/user-edit.component';
//ANIMAL DETAIL
import {AnimalDetailComponent} from './component/animal-detail/animal.detail.component';
const appRoutes: Routes =[
    {path: '',component:HomeComponent},
    {path: '',redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component:HomeComponent},
    {path: 'contacto', component:ContactComponent},
    {path: 'tienda', component:TiendaComponent},
    {path: 'animales', component:AnimalsComponent},
    {path: 'cuidadores', component:KeepersComponent},
    {path: 'registro', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'animal/:id', component:AnimalDetailComponent},
    {path: 'usuario', component:UserEditComponent},
    {path: '**', component:HomeComponent} //Por si se coloca una ruta mal
];
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//Localstorage permite guardar inforamcion para utilizarla en cualquier otro momento