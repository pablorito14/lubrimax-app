import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OrdenadoresService } from '../../services/ordenadores.service';

@Component({
  selector: 'app-desplegable-pc',
  templateUrl: './desplegable-pc.component.html',
  styleUrls: ['./desplegable-pc.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DesplegablePcComponent),
      multi:true
    }
  ]
})
export class DesplegablePcComponent implements OnInit,ControlValueAccessor {
  pc: string = '';
  compValid:boolean = false;
  // comp:string = '';
  arrPC: any[] = [];
  onChange = (_:any) => {};
  onTouch = () => {};
  @Input()
    computadora: string | null | undefined;
  
    constructor(private _ordenadoresService:OrdenadoresService) { }
  
  

  ngOnInit(): void {
    this.cargarDatos();
    
    if(this.computadora){
      this.cambiarComp(this.computadora.toString());
    }  
  }

  cambiarComp(value:string):void{
    if(value){
      this.pc = value;
      this.onTouch();
      this.onChange(this.pc);
      this.compValid = true;
    }
  }

  writeValue(value:string):void{
    if(value){
      this.pc = value;
      
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  cargarDatos(){
    this._ordenadoresService.getComputadoras()
        .subscribe(data => {
          data.forEach((element:any) => {
            this.arrPC.push({
              cod: element.payload.doc.data().cod,
              nombre: element.payload.doc.data().teamviewer
            })
          })
        });
  }

}
