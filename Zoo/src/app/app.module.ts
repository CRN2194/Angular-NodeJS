import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; //es necesario para utilizar ngmodels entre otros
import { AppRoutingModule } from './app-routing.module';
import { routing, appRoutingProviders } from './app.routing'
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
//IMPORTAR LOS COMPONENTES TIEDA, PARQUE ....
import {TiendaComponent} from './component/tienda/tienda.component';
import {ParquesComponent} from './component/parques/parques.component';
import {AnimalsComponent} from './component/animals/animals.component';
import {ContactComponent} from './component/contact/contact.component';
import {HomeComponent} from './component/home/home.component';
import {KeepersComponent} from './component/keepers/keepers.component';
//Importar modulo email creado
import {ModuloEmailModule} from './moduleEmail/moduloemail.module';
import{AdminModule} from './admin/admin.module';
//componen login y registro
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';
//Componente editar
import {UserEditComponent} from './component/user-edit/user-edit.component';
//sERVICIO
import{UserService} from './services/user.service';
//ANIMAL DETAIL
import {AnimalDetailComponent} from './component/animal-detail/animal.detail.component';
@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    AnimalsComponent,
    ContactComponent,
    HomeComponent,
    KeepersComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    AnimalDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    ModuloEmailModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders, UserService],//servicio de manera global en la aplicación
  bootstrap: [AppComponent],
  
})
export class AppModule { }
