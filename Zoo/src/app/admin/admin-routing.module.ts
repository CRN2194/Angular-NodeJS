import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
//Guard
import { AdminGuard } from '../services/admin.guard';
const adminRoutes: Routes=[
    {
        path: 'admin-panel',
        component: MainComponent,
        canActivate: [AdminGuard],
        children: [ //Cuando se quiere implementar algún tipo de configuración (guard) en una ruta, se debe colocar canActivate
            {path: '', redirectTo:'listado',pathMatch:'full'},
            {path: 'listado',component:ListComponent},
            {path: 'crear',component:AddComponent},
            {path: 'editar/:id',component:EditComponent}
        ]
    },
    { path: 'listado-del-panel',component:ListComponent}, //NO ES UNA RUTA HIJA

];
@NgModule({
    imports:[
        RouterModule.forChild(adminRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AdminRoutingModule{};