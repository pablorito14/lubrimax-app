import { Component, OnInit, ViewChild } from '@angular/core';
import { CostosService } from '../../services/costos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-costos',
  templateUrl: './list-costos.component.html',
  styleUrls: ['./list-costos.component.css']
})
export class ListCostosComponent implements OnInit {
  createConcepto:FormGroup;
  conceptos:any = [];
  editing:boolean = false;
  loading:boolean = false;
  title:string = 'Agregar concepto';
  action:string = '';
  constructor(
    private _costosService:CostosService,
    private fb:FormBuilder,
    private toastr:ToastrService
    ){
      this.createConcepto = this.fb.group({
        id:[''],
        concepto:['',Validators.required],
        valor: ['',Validators.required]
      })
     }

  ngOnInit(): void {
    this.cargarConceptos();
  }

  cargarConceptos(){
    this._costosService.getConceptos().subscribe(data => {
      this.conceptos = [];
      data.forEach((element:any) => {
        this.conceptos.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  habilitarEditar(id?:string){
    this.editing = true;

    if(id){
      this.title = 'Editar concepto';
      this.llenarForm(id);
    } else {
      this.llenarForm();
    }
  }

  llenarForm(id?:string){
    if(id){
      this._costosService.getConcepto(id)
        .subscribe(data => {
          this.createConcepto.setValue({
            id: data.payload.id,
            concepto:data.payload.data()['concepto'],
            valor:data.payload.data()['valor']
          });
        });
    } else {
      this.createConcepto.setValue({
        id: '',
        concepto: '',
        valor: ''
      });
    }
  }

  guardarEditarConcepto(){
    var id = this.createConcepto.value.id
    var costo = {
      concepto: this.createConcepto.value.concepto,
      valor: this.createConcepto.value.valor
    }

    if(id != ''){
      this.editarConcepto(id,costo);
    } else {
      this.guardarConcepto(costo);
    }
  }

  guardarConcepto(costo:any){
    this.loading = true;
    this._costosService.agregarConcepto(costo)
        .then(() => {
          this.toastr.success('Concepto actualizado');
          this.llenarForm();
          this.editing = false;
        })
        .catch(error => {
          this.toastr.error(error);
        })
        .finally(() => {
          this.loading = false;
        })
  }

  editarConcepto(id:string,costo:any){
    this.loading = true;
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
          this.loading = false;
        })
  }
  

}
