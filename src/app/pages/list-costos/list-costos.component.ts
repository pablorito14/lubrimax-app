import { Component, OnInit, ViewChild } from '@angular/core';
import { CostosService } from '../../services/costos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-list-costos',
  templateUrl: './list-costos.component.html',
  styleUrls: ['./list-costos.component.css']
})
export class ListCostosComponent implements OnInit {
  user$:Observable<any> = this._authSvc.auth.user;

  createConcepto:FormGroup;
  conceptos:any = [];
  uActualizacion:Date = new Date();
  editing:boolean = false;
  loading:boolean = true;
  process:boolean = false;
  
  submitted:boolean = false;
  disable_comp:boolean = true;
  title:string = 'Agregar concepto';
  action:string = '';
  
  constructor(
    private _authSvc:AuthService,
    private _costosService:CostosService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router
    ){
      this.createConcepto = this.fb.group({
        id:[''],
        concepto:['',Validators.required],
        valor: ['',Validators.required]
        
      })
     }

  ngOnInit(): void {
    this.user$.subscribe(data => {
      if(!data){
        this.router.navigate(['/login']);  
      } 
      
    });
    this.cargarConceptos();
  }

  cargarConceptos(){
    this._costosService.getConceptos().subscribe(data => {
      this.conceptos = [];
      data.forEach((element:any) => {
        this.conceptos.push({
          id:element.payload.doc.id,
          concepto: element.payload.doc.data()['concepto'],
          valor: element.payload.doc.data()['valor'],
          ultimaActualizacion: new Date(element.payload.doc.data().ultimaActualizacion.seconds*1000)
        });
      });
      this.loading = false;
    })
  }

  habilitarEditar(id?:string){
    this.editing = true;
    this.llenarForm(id);
    // if(id){
    //   this.title = 'Editar concepto';
    //   this.llenarForm(id);
    // } else {
    //   this.llenarForm();
    // }
  }

  llenarForm(id?:string){
    
    if(id){
      this.action = 'edit';
      this.title = 'Editar concepto';
      this._costosService.getConcepto(id)
        .subscribe(data => {
          this.uActualizacion = new Date(data.payload.data().ultimaActualizacion.seconds*1000);
          this.createConcepto.setValue({
            id: data.payload.id,
            concepto:data.payload.data()['concepto'],
            valor:data.payload.data()['valor']
          });
        });
    } else {
      this.action = 'add';
      this.createConcepto.setValue({
        id: '',
        concepto: '',
        valor: ''
      });
    }
  }

  guardarEditarConcepto(){
    this.submitted = true;
    if(this.createConcepto.invalid){
      return;
    }
    
    var id = this.createConcepto.value.id
    var costo = {
      concepto: this.createConcepto.value.concepto,
      valor: this.createConcepto.value.valor,
      ultimaActualizacion: new Date()
    }

    if(id != ''){
      this.editarConcepto(id,costo);
    } else {
      this.guardarConcepto(costo);
    }
  }

  guardarConcepto(costo:any){
    this.process = true;

    this._costosService.agregarConcepto(costo)
        .then(() => {
          this.toastr.success('Concepto agregado');
          this.llenarForm();
          this.editing = false;
        })
        .catch(error => {
          this.toastr.error(error);
        })
        .finally(() => {
          this.process = false;
        })
  }

  editarConcepto(id:string,costo:any){
    this.process = true;
    this._costosService.actualizarConcepto(id,costo)
        .then(() => {
          this.toastr.success('Concepto actualizado');
          this.llenarForm();
          this.editing = false;
        })
        .catch(error => {
          this.toastr.error(error);
        })
        .finally(() => {
          this.process = false;
        })
  }
  

}
