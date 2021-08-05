import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from '../../services/mantenimientos.service';
import { listadoMantenimientos } from '../../../helpers/generar-tablas';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//

@Component({
  selector: 'app-historial-mant',
  templateUrl: './historial-mant.component.html',
  styleUrls: ['./historial-mant.component.css']
})


export class HistorialMantComponent implements OnInit {
  mantenimientos:any[]=[];
  formFiltro:FormGroup;
  filtro :string = ''; 

  constructor(private _mantenimientosService:MantenimientosService,
              private fb:FormBuilder,
              private router:Router) {

    this.formFiltro = this.fb.group({
      filtro: ['']
    })
    this.obtenerDatos();
  }

  ngOnInit(): void {
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
          
    });
    
  }

}
