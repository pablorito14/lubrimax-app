import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatepickerComponent } from 'src/app/components/datepicker/datepicker.component';
import { CostosService } from '../../services/costos.service';
import { DesplegablePcComponent } from '../../components/desplegable-pc/desplegable-pc.component';
import { CuentaCorrienteService } from '../../services/cuenta-corriente.service';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.css']
})
export class CuentaCorrienteComponent implements OnInit {
  createCosto:FormGroup;

  loading:boolean = true;
  submitted:boolean = false;
  deleting:boolean = false;
  id_deleting:string= '';
  concValid:boolean = false;

  fechaActual:Date = new Date();

  arrConceptos:any;
  ctaCte:any = [];
  vCtaCte:number = 0;

  @ViewChild(DatepickerComponent)
  dtp!: DatepickerComponent;

  @ViewChild(DesplegablePcComponent)
  cmb!: DesplegablePcComponent;

  @ViewChild(DesplegablePcComponent)
  vista!: DesplegablePcComponent;

  constructor(
    private fb:FormBuilder,
    private _costosService:CostosService,
    private _ctaCteservice:CuentaCorrienteService,
    private router:Router,
    private toastr:ToastrService,
    private aRoute:ActivatedRoute
  ) { 
  
    
    this.createCosto = this.fb.group({
      fecha:this.fechaActual.getDate()
        +'/'+(this.fechaActual.getMonth()+1)
        +'/'+this.fechaActual.getFullYear(),
      computadora: ['',Validators.required],
      concepto: ['',Validators.required],
      valor: ['']
    });
    this.createCosto.get('concepto')?.valueChanges.subscribe(c => {
      if(c != 'transferencia' && c != 'chequeElec'){
        this.createCosto.get('valor')?.setValue(this.arrConceptos[c]);
      } else {
        this.createCosto.get('valor')?.setValue('');
      }
      
    })
  }

  ngOnInit(): void {
    // console.log(this.router.url);
    // console.log(this.aRoute.snapshot.paramMap.get('id'));
    this.cargarDatos();
  }

  

  cambiarConc(value:string):void{
    if(value){
      this.concValid = true;
    }
  }

  agregarCosto(){
    this.submitted = true;

    if(this.createCosto.invalid){
      this.submitted = false;
      return;
    }

    const fecha = this.createCosto.value.fecha;// formato Date cuando recibe un dato
    const arrFecha = fecha.split('/')

    var costo:any = {
      fecha: new Date(arrFecha[2],(arrFecha[1]-1),arrFecha[0],0,0,0),
      computadora: this.createCosto.value.computadora,
      concepto: this.createCosto.value.concepto,
      valor:this.createCosto.value.valor,
      fechaCreacion: new Date()
    }

    // console.log(costo);

    this._ctaCteservice.guardarCosto(costo)
        .then(() => {
          this.toastr.success('Cuenta corriente actualizada');
          this.submitted = false;
          this.resetForm();
          
        })
        .catch(error => {
          this.toastr.error('catch agregarCosto()');
        })

  }

  
  resetForm(){
    let fecha = new Date();
    this.dtp.setFecha(
      new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate(),
        0,0,0
        )
      );
    this.cmb.resetComp();
    this.createCosto.setValue({
      fecha:this.fechaActual.getDate()
        +'/'+(this.fechaActual.getMonth()+1)
        +'/'+this.fechaActual.getFullYear(),
      computadora:'',
      concepto: '',
      valor: ''
    });
  }

  eliminarCosto(id:string){
    this.deleting = true;
    this.id_deleting = id;

    
    this._ctaCteservice.eliminarCosto(id)
        .then(() => {
          this.toastr.success('Cuenta corriente actualizada');
          
        })
        .catch(error => {
          this.toastr.error('cat eliminarCosto()');
        })
        .finally(() => {
          this.deleting = false;
          this.id_deleting = '';
        })
  }

  cargarDatos(){
    
    this._costosService.getConceptos().subscribe(data => {
      this.arrConceptos = [];
      data.forEach((element:any) => {
        let concepto = element.payload.doc.data();
        this.arrConceptos.push(concepto.concepto);
        this.arrConceptos[concepto.concepto] = concepto.valor;

      });
      
    });

    this._ctaCteservice.getCuentaCorriente().subscribe(data => {
      this.ctaCte = [];
      this.vCtaCte = 0;
      data.forEach((element:any) => {
        this.ctaCte.push({
          id: element.payload.doc.id,
          fecha: new Date(element.payload.doc.data().fecha.seconds*1000),
          computadora: element.payload.doc.data()['computadora'],
          concepto: element.payload.doc.data()['concepto'],
          valor: element.payload.doc.data()['valor']
          
        });
        this.vCtaCte += parseInt(element.payload.doc.data()['valor']);
      });
      this.loading = false;
    })

  }

}
