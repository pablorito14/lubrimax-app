import { Component, OnInit } from '@angular/core';
import { OrdenadoresService } from 'src/app/services/ordenadores.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  computadoras:any[] = [];
  
  constructor(private _ordenadoresService:OrdenadoresService) {
    
   }

  ngOnInit(): void {
    this.getComputadoras();
  }

  getComputadoras(){
    this._ordenadoresService.getComputadoras().subscribe(data => {
      this.computadoras = [];

      data.forEach((element:any) => {
        this.computadoras.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.computadoras);
      
    });
  }

}