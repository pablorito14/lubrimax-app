import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { InputDateComponent } from '../../components/input-date/input-date.component';
import { CuentaCorrienteService } from '../../services/cuenta-corriente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-facturaciones',
  templateUrl: './list-facturaciones.component.html',
  styleUrls: ['./list-facturaciones.component.css']
})
export class ListFacturacionesComponent implements OnInit {
  loading:boolean = false;
  testFecha:FormGroup;
  myDate:string;

  datosPrueba:any[] = [];
  
  @ViewChild(InputDateComponent)
  input_date!: InputDateComponent;
  
  constructor(
    private fb:FormBuilder,
    private _ccService:CuentaCorrienteService,
    private toastr:ToastrService
  ) {
    // console.log(moment().format('MM'));
    // var i = moment().format('L');
    // var fecha = moment().set({'year': 2013, 'month': 3});

    // fecha que viene al formulario desde la base de datos
    var f = new Date();
    // generar fecha con formato para input=date con moment
    var d = moment().set({
      'year': f.getFullYear(), 
      'month': f.getMonth(),
      'date': f.getDate()
    });
    this.myDate = d.format('YYYY-MM-DD');
    // inicializar el formulario con la fecha traida de la bd
    this.testFecha = this.fb.group({
      fecha:[
        d.format('YYYY-MM-DD')
      ]
    })
    

   }

  ngOnInit(): void {
    this.cargarDatos();
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
  }

  cargarDatos(){
    this._ccService.getDatosPrueba()
        .subscribe(data => {
          this.datosPrueba = [];
          data.forEach((element:any) => {
            this.datosPrueba.push({
              id:element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          // console.log(this.datosPrueba);
        })
    // this.testFecha.setValue({
    //   fecha: '2021-08-10'
    // })
  }

  guardarNewDate(){
    // fecha desde la bd: 2622338200 -> 2053-02-20
    var fechaSel = this.testFecha.get('fecha')?.value;
    console.log('fecha seleccionada',fechaSel); //YYYY-MM-DD

    var arrFecha = fechaSel.split('-');
    console.log(arrFecha);
    
    this.input_date.cambiarFecha((moment().set({
        'year': arrFecha[0], 
        'month': arrFecha[1]-1,
        'date': arrFecha[2]
      })).format('YYYY-MM-DD'));
    
    this.myDate = this.testFecha.get('fecha')?.value
    
    console.log('fecha tomada del input-date',this.myDate);
    var arrDate = this.myDate.split('-');

    var save = {
      strDate: this.myDate,
      date: new Date(parseInt(arrDate[0]),parseInt(arrDate[1])-1,parseInt(arrDate[2]),0,0,0)
    }

    console.log(save);

    this._ccService.guardarPrueba(save)
          .then(() => {
            this.toastr.info('guardado'); 
            this.input_date.resetFecha();
          })
          .catch(error => this.toastr.error(error));
    
  }

  cargarFecha(id:string){
    var nuevo = this.datosPrueba.filter(data => data.id == id);
    // console.log(nuevo[0].date.seconds);


    // console.log();
    let f = moment(nuevo[0].date.seconds*1000).format('YYYY-MM-DD');
    this.input_date.setFecha(f);
    
    // filter(number => number > 10 )
  }

}
