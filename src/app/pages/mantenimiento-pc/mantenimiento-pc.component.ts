import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MantenimientosService } from '../../services/mantenimientos.service';

@Component({
  selector: 'app-mantenimiento-pc',
  templateUrl: './mantenimiento-pc.component.html',
  styleUrls: ['./mantenimiento-pc.component.css']
})
export class MantenimientoPcComponent implements OnInit {
  id:string | null;
  createMant:FormGroup;

  loading:boolean = false;
  titulo:string = 'Agregar mantenimiento';


  constructor(
      private fb:FormBuilder,
      private _mantenimientosService:MantenimientosService,
      private router:Router,
      private toastr:ToastrService,
      private aRoute:ActivatedRoute
    ) { 
      this.id = this.aRoute.snapshot.paramMap.get('id');
      this.createMant = this.fb.group({
      
      // accion: {
        archivos: [false],
        registro: [false],
        malware: [false],
        updates: [false],
        other: ['']
      // }
    });

    
    // this.mostrarData();
  }

  ngOnInit(): void {
    
  }

  mostrarData(){
    const mant:any={
      cod: this.id,
      fecha: new Date(),
      accion:{
        archivos:this.createMant.value.archivos,
        registro:this.createMant.value.registro,
        malware:this.createMant.value.malware,
        updates:this.createMant.value.updates,
        other:this.createMant.value.other,
      }
    }
    console.log(mant);
  }

  // agregarEditarMant(){
  //   const mant = {
  //     cod:'venta-4',
  //     fecha: new Date(),
  //     accion: {
  //       archivos: true,
  //       registro: true,
  //       malware: true,
  //       updates: true,
  //       other: 'instalacion de impresora en sistema'
  //     }
  //   };

  //   this._mantenimientosService.agregarMantenimiento(mant)
  //           .then(() => {
  //             console.log('mantenimiento guardado');
  //           })
  //           .catch(error => { console.log(error); })
  // }

}
