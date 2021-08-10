import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OrdenadoresService } from '../../services/ordenadores.service';
import { Router } from '@angular/router';

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
  is_invalid:boolean = false;
  // comp:string = '';
  arrPC: any[] = [];
  onChange = (_:any) => {};
  onTouch = () => {};
  @Input()
    computadora: string | null | undefined;

  vista:string;
  
  constructor(
    private _ordenadoresService:OrdenadoresService,
    private router: Router) {
      this.vista = this.router.url;
  }

  ngOnInit(): void {
    this.cargarDatos();
    if(this.computadora){
      this.cambiarComp(this.computadora.toString());
    }  
  }

  validar(valid:boolean){
    this.is_invalid = valid;
  }

  resetComp():void{
    this.compValid = false;
  }

  setVista(vista:string):void{
    this.vista=vista;
  }

  cambiarComp(value:string):void{
    if(value){
      this.pc = value;
      this.onTouch();
      this.onChange(this.pc);
      this.compValid = true;
      this.is_invalid = false;
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
