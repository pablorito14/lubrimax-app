import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MantenimientosService } from '../../services/mantenimientos.service';

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
  validCompu:boolean = false;
  titulo:string = 'Agregar mantenimiento';


  constructor(
      private fb:FormBuilder,
      private _mantenimientosService:MantenimientosService,
      private router:Router,
      private toastr:ToastrService,
      private aRoute:ActivatedRoute
    ) { 
      // this.id_pc = this.aRoute.snapshot.paramMap.get('id'); 
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
      // this.id_pc = this.aRoute.snapshot.paramMap.get('id'); 
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

    const mant:any={
      cod: this.createMant.value.cod,
      fUnix: new Date(arrFecha[2]+'-'+arrFecha[1]+'-'+arrFecha[0]+' 00:00:00'),
      fecha: {
        dia: arrFecha[0],
        mes: arrFecha[1],
        anio: arrFecha[2]
      },
      accion:{
        archivos:this.createMant.value.archivos,
        registro:this.createMant.value.registro,
        malware:this.createMant.value.malware,
        updates:this.createMant.value.updates,
        other: other,
      }
    }
    // console.log(mant);
    // formatoDDMMMYYYY(fecha);
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
    // const mant:any = this.generarData();

  //  
  // const fecha = this.createMant.value.fecha;
  // const arrFecha = fecha.split('/')

  var other:string = this.createMant.value.other;
  // if(other != ''){
  //   other = other.replace(/\n/g, "<br />");
  // }

  const mant:any={
    cod: this.createMant.value.cod,
    // fUnix: new Date(arrFecha[2]+'-'+arrFecha[1]+'-'+arrFecha[0]+' 00:00:00'),
    // fecha: {
    //   dia: arrFecha[0],
    //   mes: arrFecha[1],
    //   anio: arrFecha[2]
    // },
    accion:{
      archivos:this.createMant.value.archivos,
      registro:this.createMant.value.registro,
      malware:this.createMant.value.malware,
      updates:this.createMant.value.updates,
      other: other,
    }
  }
  //
    this.toastr.success(mant.cod);
    this.loading = true;
    this._mantenimientosService
        .agregarMantenimiento(mant)
        .then(() => {
          this.toastr.success("Mantenimiento agregado. AGREGAR COSTO CUANDO MANTENIMIENTO AGREGADO");
          this.loading = false;
          this.router.navigate(['/historial-mant']);


        })
        .catch(error => {
          this.toastr.error("catch agregarMantenimiento()");
          this.loading = false;
        })
  }

  editarMantenimiento(id:string){
    // this.toastr.error('actualizar datos de id_mant: '+id);
    const mant:any = this.generarData();
    this.loading = true;
    this._mantenimientosService
        .agregarMantenimiento(mant)
        .then(() => {
          this.toastr.success("Mantenimiento agregado. AGREGAR COSTO CUANDO MANTENIMIENTO AGREGADO");
          this.loading = false;
          this.router.navigate(['/historial-mant']);


        })
        .catch(error => {
          this.toastr.error("catch agregarMantenimiento()");
          this.loading = false;
        })
    // console.log('actualizar datos de id_mant: '+id);
  }

  editar(){
    if(this.id_mant !== null){
      this.titulo = "Editar mantenimiento";
      this.toastr.error('Cargar datos de id_mant: '+this.aRoute.snapshot.paramMap.get('mant'));
      // console.log('buscar datos en la bd');
    }
  }

}


