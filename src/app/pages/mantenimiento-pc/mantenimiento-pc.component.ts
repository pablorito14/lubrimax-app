import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatepickerComponent } from 'src/app/components/datepicker/datepicker.component';
import { MantenimientosService } from '../../services/mantenimientos.service';
// import { DatepickerComponent } from '../../components/datepicker';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { OrdenadoresService } from '../../services/ordenadores.service';

@Component({
  selector: 'app-mantenimiento-pc',
  templateUrl: './mantenimiento-pc.component.html',
  styleUrls: ['./mantenimiento-pc.component.css']
})
export class MantenimientoPcComponent implements OnInit {
  id_mant:string | null;
  id_pc:string | null;
  createMant:FormGroup;
  fechaActual:Date = new Date();
  
  loading:boolean = false;
  
  submitted:boolean = false;
  validTareas:boolean = true;
  titulo:string = 'Agregar mantenimiento';
  
  @ViewChild(DatepickerComponent)
  dtp!: DatepickerComponent;

  constructor(
      private fb:FormBuilder,
      private _mantenimientosService:MantenimientosService,
      private _ordenadoresService:OrdenadoresService,
      private router:Router,
      private toastr:ToastrService,
      private aRoute:ActivatedRoute
    ) { 
      this.id_pc = this.aRoute.snapshot.paramMap.get('id'); 
      this.createMant = this.fb.group({
        cod: [this.id_pc,Validators.required],
        fecha: this.fechaActual.getDate()
                +'/'+(this.fechaActual.getMonth()+1)
                +'/'+this.fechaActual.getFullYear(),
        archivos: [false],
        registro: [false],
        malware: [false],
        updates: [false],
        other: [''],
      });
      this.id_mant = this.aRoute.snapshot.paramMap.get('mant');
      
    }

  ngOnInit(): void {
    this.editar();
  }

  generarData(){
    const fecha = this.createMant.value.fecha;
    const arrFecha = fecha.split('/')

    var other:string = this.createMant.value.other;
    if(other != ''){
      other = other.replace(/\n/g, "<br />");
    }
    
    var mant:any={}
    
    if(this.id_mant === null){
      mant = {
        cod: this.createMant.value.cod,
        fUnix: new Date(arrFecha[2],(arrFecha[1]-1),arrFecha[0],0,0,0),
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
        fUnix: new Date(arrFecha[2],(arrFecha[1]-1),arrFecha[0],0,0,0),
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
      return true;
    } else {
      return false;
    }
  }

  agregarEditarMant(){
    this.submitted = true;
    
    if(this.createMant.invalid){
      return;
    } else if(!this.customValidator()){
      this.validTareas = this.customValidator();
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
            var fechaMant = new Date(arrData['fUnix']['seconds']*1000);
            
            this.dtp.setFecha(
              new Date(
                fechaMant.getFullYear(),
                fechaMant.getMonth(),
                fechaMant.getDate(),
                0,0,0
                )
              );
            this.createMant.setValue({
              cod: arrData['cod'],
              fecha: fechaMant.getDate()
                +'/'+(fechaMant.getMonth()+1)
                +'/'+fechaMant.getFullYear(),
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


