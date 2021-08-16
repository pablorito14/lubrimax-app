import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//servicios
import { ToastrService } from 'ngx-toastr';
import { MantenimientosService } from '../../services/mantenimientos.service';
import { OrdenadoresService } from '../../services/ordenadores.service';
//componentes
import { DesplegablePcComponent } from '../../components/desplegable-pc/desplegable-pc.component';
import { InputDateComponent } from '../../components/input-date/input-date.component';

import * as moment from 'moment';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mantenimiento-pc',
  templateUrl: './mantenimiento-pc.component.html',
  styleUrls: ['./mantenimiento-pc.component.css']
})
export class MantenimientoPcComponent implements OnInit {
  user$:Observable<any> = this._authSvc.auth.user;
  id_mant:string | null;
  id_pc:string | null;
  createMant:FormGroup;
  fechaActual:Date = new Date();
  
  loading:boolean = false;
  
  submitted:boolean = false;
  validTareas:boolean = true;
  titulo:string = 'Agregar mantenimiento';
  
  @ViewChild(DesplegablePcComponent)
  cmb!: DesplegablePcComponent

  @ViewChild(InputDateComponent)
  dtp!:InputDateComponent

  constructor(
      private fb:FormBuilder,
      private _authSvc:AuthService,
      private _mantenimientosService:MantenimientosService,
      private _ordenadoresService:OrdenadoresService,
      private router:Router,
      private toastr:ToastrService,
      private aRoute:ActivatedRoute
    ) { 
      this.id_pc = this.aRoute.snapshot.paramMap.get('id'); 

      this.createMant = this.fb.group({
        cod: [this.id_pc,Validators.required],
        fecha:moment().format('YYYY-MM-DD'),
        archivos: [false],
        registro: [false],
        malware: [false],
        updates: [false],
        other: [''],
      });
      this.id_mant = this.aRoute.snapshot.paramMap.get('mant');
      
    }

  ngOnInit(): void {
    this.user$.subscribe(data => {
      if(!data){
        this.router.navigate(['/login']);  
      } 
      
    });
    this.editar();
  }

  generarData(){
    const fecha = this.createMant.value.fecha;
    const arrFecha = fecha.split('-');

    var other:string = this.createMant.value.other;
    if(other != ''){
      other = other.replace(/\n/g, "<br />");
    }
    
    var mant:any={}
    
    if(this.id_mant === null){
      mant = {
        cod: this.createMant.value.cod,
        fUnix: new Date(arrFecha[0],(arrFecha[1]-1),arrFecha[2],0,0,0),
        fechaCreacion: new Date(),
        accion:{
          archivos:this.createMant.value.archivos,
          registro:this.createMant.value.registro,
          malware:this.createMant.value.malware,
          updates:this.createMant.value.updates,
          other: other,
        }
      }
    } else {
      mant = {
        cod: this.createMant.value.cod,
        fUnix: new Date(arrFecha[0],(arrFecha[1]-1),arrFecha[2],0,0,0),
        accion:{
          archivos:this.createMant.value.archivos,
          registro:this.createMant.value.registro,
          malware:this.createMant.value.malware,
          updates:this.createMant.value.updates,
          other: other,
        }
      }
    }

    return mant;
  }

  customValidator(){
    if(this.createMant.value.archivos ||
        this.createMant.value.registro ||
        this.createMant.value.malware ||
        this.createMant.value.updates ||
        this.createMant.value.other != ''){
      this.validTareas = true;
      return true;
    } else {
      this.validTareas = false;
      return false;
    }
  }

  agregarEditarMant(){
    this.submitted = true;
    
    if(this.createMant.invalid){
      if(!this.createMant.get('computadora')?.valid){
        this.cmb.validar(true);
      }
      return;
    } else if(!this.customValidator()){
      // this.validTareas = this.customValidator();
      return;
    }
      
    if(this.id_mant === null){
      this.agregarMantenimiento();
    } else {
      this.editarMantenimiento(this.id_mant);
    }
  }


  agregarMantenimiento(){
    const mant:any = this.generarData();
    this.loading = true;
    this._mantenimientosService
      .agregarMantenimiento(mant)
      .then(() => {
          this._ordenadoresService
          .buscarOrdenador(mant.cod)
          .subscribe(data => {
            // console.log(data.docs[0].id);
            this._ordenadoresService
                .actUltimoMant(data.docs[0].id,mant.fUnix)
                .then(() => {
                  this.toastr.success("Mantenimiento agregado");
                  this.loading = false;
                  this.router.navigate(['/historial-mant']);
                })
                .catch(error => {
                  this.toastr.error(error);
                  this.loading = false;   
                });
          });
      })
      .catch(error => {
        this.toastr.error("catch agregarMantenimiento()");
        this.loading = false;
      });
  }

  editarMantenimiento(id:string){
    // this.toastr.error('actualizar datos de id_mant: '+id);
    const mant:any = this.generarData();
    console.log(mant);
    this.loading = true;
    this._mantenimientosService
        .editarMantenimiento(mant,id)
        .then(() => {
          this._ordenadoresService
          .buscarOrdenador(mant.cod)
          .subscribe(data => {
            // console.log(data.docs[0].id);
            this._ordenadoresService
                .actUltimoMant(data.docs[0].id,mant.fUnix)
                .then(() => {
                  this.toastr.success("Mantenimiento actualizado");
                  this.loading = false;
                  this.router.navigate(['/historial-mant']);
                })
                .catch(error => {
                  this.toastr.error(error);
                  this.loading = false;   
                });
          });
        })
        .catch(error => {
          this.toastr.error("catch agregarMantenimiento()");
          this.loading = false;
        })
    // console.log('actualizar datos de id_mant: '+id);
  }

  eliminarMantenimiento(id:string){
    // this.loading = true;
    console.log('eliminar mantenimiento: '+id);
  }

  editar(){
    if(this.id_mant !== null){
      // console.log('4 - '+this.fechaActual2);
      this.titulo = "Editar mantenimiento";
      this._mantenimientosService.getMantenimiento(this.id_mant)
          .subscribe(data => {
            let arrData = data.payload.data();
            let fechaMant = moment(arrData['fUnix']['seconds']*1000).format('YYYY-MM-DD');
            this.dtp.setFecha(fechaMant);
            this.createMant.setValue({
              cod: arrData['cod'],
              fecha:fechaMant,
              archivos: arrData['accion']['archivos'],
              registro: arrData['accion']['registro'],
              malware: arrData['accion']['malware'],
              updates: arrData['accion']['updates'],
              other: arrData['accion']['other'].replace('<br />','\n')
            });
            
          })
    } 
  }

}


