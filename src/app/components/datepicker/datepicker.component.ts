import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// import { BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { listLocales } from 'ngx-bootstrap/chronos';

import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi:true
    }
  ]

})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

  // fecha:string='';
  // fechaActual:Date = new Date();
  // onChange = (_:any) => {};
  // onTouch = () => {};
  constructor() {}  

  // constructor(private bsConfig:BsDatepickerConfig,
  //             private localeService:BsLocaleService){
    
  //   this.bsConfig.dateInputFormat = 'D/M/YYYY';
  //   this.bsConfig.showWeekNumbers = false;
  //   this.bsConfig.isAnimated = true;
  //   this.bsConfig.containerClass = 'theme-dark-blue';
    
  //   defineLocale('es', esLocale);
  //   this.localeService.use('es');

  //   this.fecha =  this.fechaActual.getDate()
  //             +'/'+(this.fechaActual.getMonth()+1)
  //             +'/'+this.fechaActual.getFullYear();
  //   this.cambiarFecha(this.fecha);
  // }
  

  ngOnInit(): void {
  }

  

  setFecha(fecha:Date){
    // this.fechaActual = fecha;
    // this.cambiarFecha(this.fechaActual.getDate()+'/'+(this.fechaActual.getMonth()+1)+'/'+this.fechaActual.getFullYear());
  }
  
  cambiarFecha(value:string):void{
    // if(value){
    //   this.fecha = value;
    //   this.onTouch();
    //   this.onChange(this.fecha);
    // }
  }

  writeValue(value:string):void{
    if(value){
      // this.fecha = value;
    }
  }
  registerOnChange(fn: any): void {
    // this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // this.onTouch = fn;
  }

  // setDisabledState(state: boolean):void{
  //   this.isDisabled = state;
  // }
}
