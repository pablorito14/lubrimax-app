import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import * as moment from 'moment';
// import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { ValidationErrors } from '@angular/forms';
import { Valor } from '../../interfaces/valor';
import { CostosService } from '../../services/costos.service';

@Component({
  selector: 'app-list-facturaciones',
  templateUrl: './list-facturaciones.component.html',
  styleUrls: ['./list-facturaciones.component.css']
})
export class ListFacturacionesComponent implements OnInit {
  user$:Observable<any> = this._authSvc.auth.user; 
  loading:boolean = true;
  valores:Valor[] = [];
  
  constructor(
    private _authSvc:AuthService,
    private router:Router,
    private _costosSvc:CostosService
  ) { }

  ngOnInit(): void {
    this.user$.subscribe(data => {
      if(!data){
        this.router.navigate(['/login']);  
      } 
      
    });
    // this.cargarDatos();
    
  }

  // cargarDatos(){
  //   this.valores = [];
  //   this._costosSvc.getConceptos().subscribe(data => {
  //     data.forEach((element:any) => {
  //       var valor:Valor = {
  //         // id: element.payload.doc.id,
  //         ...element.payload.doc.data()
  //       }
  //       this.valores.push(valor);
  //       console.log(element.payload.doc.data());
  //     });
  //     console.log(this.valores);
  //   });

  // }
  
}
