import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EditarPcComponent } from './pages/editar-pc/editar-pc.component';
import { MantenimientoPcComponent } from './pages/mantenimiento-pc/mantenimiento-pc.component';
import { HistorialMantComponent } from './pages/historial-mant/historial-mant.component';

const routes: Routes = [
  {path: 'home',component:InicioComponent},
  {path: 'agregar-pc',component:EditarPcComponent},
  {path: 'editar-pc/:id',component:EditarPcComponent},
  {path: 'agregar-mantenimiento',component:MantenimientoPcComponent},
  {path: 'agregar-mantenimiento/:id',component:MantenimientoPcComponent},
  {path: 'editar-mantenimiento/:id/:mant',component:MantenimientoPcComponent},
  {path: 'historial-mant',component:HistorialMantComponent},
  {path: '**',pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
