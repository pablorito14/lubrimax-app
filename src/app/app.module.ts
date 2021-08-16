import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ListPcComponent } from './pages/list-pc/list-pc.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EditarPcComponent } from './pages/editar-pc/editar-pc.component';
import { MantenimientoPcComponent } from './pages/mantenimiento-pc/mantenimiento-pc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { HistorialMantComponent } from './pages/historial-mant/historial-mant.component';
// import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { InputComponent } from './components/input/input.component';
import { DesplegablePcComponent } from './components/desplegable-pc/desplegable-pc.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ComputadoraPipe } from './pipes/computadora.pipe';


import { registerLocaleData } from '@angular/common';
import { ListFacturacionesComponent } from './pages/list-facturaciones/list-facturaciones.component';
import { ListCostosComponent } from './pages/list-costos/list-costos.component';
import { CuentaCorrienteComponent } from './pages/cuenta-corriente/cuenta-corriente.component';
import { MomentModule } from 'ngx-moment';

import localeEs from '@angular/common/locales/es-AR';
registerLocaleData(localeEs);

import * as moment  from 'moment';
import { InputDateComponent } from './components/input-date/input-date.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NoAuthComponent } from './auth/no-auth/no-auth.component';
moment.locale('es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListPcComponent,
    EditarPcComponent,
    MantenimientoPcComponent,
    HistorialMantComponent,
    InputComponent,
    DesplegablePcComponent,
    BackButtonComponent,
    ComputadoraPipe,
    ListFacturacionesComponent,
    ListCostosComponent,
    CuentaCorrienteComponent,
    InputDateComponent,
    LoginComponent,
    NoAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MomentModule
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
