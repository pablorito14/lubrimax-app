import { Component, OnInit } from '@angular/core';
import { ComputadorasService } from '../../services/computadoras.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  computadoras:any[] = [];

  constructor(private _computadorasService:ComputadorasService) { }

  ngOnInit(): void {
    this.getComputadoras();
    
  }

  getComputadoras(){
    this._computadorasService.getComputadoras().subscribe(data => {
      this.computadoras = [];

      data.forEach((element:any) => {
        this.computadoras.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      
    });
  }

}
