import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi:true
    }
  ]
})
export class InputDateComponent implements OnInit,ControlValueAccessor {
  fechaActual:Date = new Date();
  fecha:string;
  onChange = (_:any) => {};
  onTouch = () => {};

  constructor() { 
    var f = new Date();
    var d = moment().set({
      'year': f.getFullYear(), 
      'month': f.getMonth(),
      'date': f.getDate()
    });
    
    this.fecha = d.format('YYYY-MM-DD');
    this.cambiarFecha(this.fecha);
  }

  ngOnInit(): void {
  }

  obtenerFecha(fecha:any){
    console.log(fecha);
    // var f = new Date(fecha*1000);
    // var d = moment().set({
    //   'year': f.getFullYear(), 
    //   'month': f.getMonth(),
    //   'date': f.getDate()
    // });

    // console.log(d);
    
    // this.fechaNew = d.format('YYYY-MM-DD');
    // console.log(d.format('YYYY-MM-DD'));
    // this.testFecha = this.fb.group({
    //   fecha:[
    //     d.format('YYYY-MM-DD')
    //   ]
    // })

  }

  resetFecha(){
    var f = new Date();
    var d = moment().set({
      'year': f.getFullYear(), 
      'month': f.getMonth(),
      'date': f.getDate()
    });
    
    this.fecha = d.format('YYYY-MM-DD');
    this.cambiarFecha(this.fecha);
  }

  setFecha(fecha:string){
    this.fecha = fecha;
    this.cambiarFecha(this.fecha);
  }
  
  cambiarFecha(value:string):void{
    if(value){
      this.fecha = value;
      this.onTouch();
      this.onChange(this.fecha);
    }
  }

  writeValue(value:string):void{
    if(value){
      this.fecha = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
