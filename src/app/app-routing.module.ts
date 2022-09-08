import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

const routes: Routes = [
    {
        path: '', // para indicar que es la ruta del dominio - Sera el primer componente que se visualizaria como si fuera la pagina por default
        component: PorPaisComponent,
        pathMatch: 'full'//  para que valide con la ruta completo
    },
    {
        path: 'region',
        component: PorRegionComponent,
    },
    {
        path: 'capital',
        component: PorCapitalComponent,
    },
    {
        path: 'pais/:id', // para indicarle que recibe un parametro
        component: VerPaisComponent,
    },
    {
        path: '**',// eso seria similar al 404, si no existe una url que eligen, los redireccionara al primer path declaro o podria poner un componente como 404Component.
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes) // El que hace la configuraciones de la ruta, para las rutas principales
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }