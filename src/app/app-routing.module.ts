import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EditarPcComponent } from './pages/editar-pc/editar-pc.component';
import { MantenimientoPcComponent } from './pages/mantenimiento-pc/mantenimiento-pc.component';

const routes: Routes = [
  {path: 'home',component:InicioComponent},
  {path: 'agregar-pc',component:EditarPcComponent},
  {path: 'editar-pc/:id',component:EditarPcComponent},
  {path: 'mantenimiento-pc/:id',component:MantenimientoPcComponent},
  {path: '**',pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
