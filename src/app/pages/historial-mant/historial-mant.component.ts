import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from '../../services/mantenimientos.service';
import { listadoMantenimientos } from '../../../helpers/generar-tablas';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
//

@Component({
  selector: 'app-historial-mant',
  templateUrl: './historial-mant.component.html',
  styleUrls: ['./historial-mant.component.css']
})


export class HistorialMantComponent implements OnInit {
  user$:Observable<any> = this._authSvc.auth.user;
  mantenimientos:any[]=[];
  formFiltro:FormGroup;
  filtro :string = ''; 
  loading:boolean = true;

  constructor( 
        private _authSvc:AuthService,
        private _mantenimientosService:MantenimientosService,
        private fb:FormBuilder,
        private router:Router) {

    this.formFiltro = this.fb.group({
      filtro: ['']
    })
    this.obtenerDatos();
  }

  ngOnInit(): void {
    this.user$.subscribe(data => {
      if(!data){
        this.router.navigate(['/login']);  
      } 
    });
  }

  filtrarResultados(){
    this.filtro = this.formFiltro.value.filtro;
    this.obtenerDatos();
  }

  resetearTable(){
    this.filtro = '';
    this.obtenerDatos();
    
  }

  obtenerDatos(){ 
    this._mantenimientosService.getMantenimientos()
        .subscribe(data => {
          this.mantenimientos = listadoMantenimientos(data);
          this.loading = false;
    });
    
  }

}
