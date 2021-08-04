import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi:true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  texto:string='';
  onChange = (_:any) => {};
  onTouch = () => {};
  isDisabled: boolean = false;

  constructor() { }

  editarValor(value:string):void{
    this.texto=value;
    this.onTouch();
    this.onChange(this.texto);
  }

  writeValue(value:string): void {
    if(value){
      this.texto = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
  }

}
