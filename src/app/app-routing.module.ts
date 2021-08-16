import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPcComponent } from './pages/editar-pc/editar-pc.component';
import { MantenimientoPcComponent } from './pages/mantenimiento-pc/mantenimiento-pc.component';
import { HistorialMantComponent } from './pages/historial-mant/historial-mant.component';
import { ListCostosComponent } from './pages/list-costos/list-costos.component';
import { ListFacturacionesComponent } from './pages/list-facturaciones/list-facturaciones.component';
import { CuentaCorrienteComponent } from './pages/cuenta-corriente/cuenta-corriente.component';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthComponent } from './auth/no-auth/no-auth.component';
import { ListPcComponent } from './pages/list-pc/list-pc.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '403',component:NoAuthComponent},
  {path: 'computadoras',component:ListPcComponent},
  {path: 'agregar-pc',component:EditarPcComponent},
  {path: 'editar-pc/:id',component:EditarPcComponent},
  {path: 'historial-mant',component:HistorialMantComponent},
  {path: 'agregar-mantenimiento',component:MantenimientoPcComponent},
  {path: 'agregar-mantenimiento/:id',component:MantenimientoPcComponent},
  {path: 'editar-mantenimiento/:id/:mant',component:MantenimientoPcComponent},
  {path: 'cuenta-corriente',component:CuentaCorrienteComponent},
  {path: 'historial-costos',component:ListCostosComponent},
  {path: 'historial-facturaciones',component:ListFacturacionesComponent},
  // {path: '', pathMatch:'full',redirectTo:''}
  {path: '**',pathMatch:'full', redirectTo: 'historial-mant'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
