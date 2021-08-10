import { Component, OnInit } from '@angular/core';
import { OrdenadoresService } from 'src/app/services/ordenadores.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  computadoras:any[] = [];
  loading:boolean = true;
  
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
          uMant:new Date(element.payload.doc.data().ultimoMant.seconds*1000),
          ...element.payload.doc.data()
        });
      });
      this.loading = false;
      
      // console.log(this.computadoras);
    });
  }

}
