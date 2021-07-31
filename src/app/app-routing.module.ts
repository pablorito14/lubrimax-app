import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListPcComponent } from './pages/list-pc/list-pc.component';

const routes: Routes = [
  {path: 'home',component:InicioComponent},
  {path: 'listado-pc',component:ListPcComponent},
  {path: '**',pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
