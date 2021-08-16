import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { OrdenadoresService } from 'src/app/services/ordenadores.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-list-pc',
  templateUrl: './list-pc.component.html',
  styleUrls: ['./list-pc.component.css'],
  providers: [ AuthService ]
})
export class ListPcComponent implements OnInit {
  user$:Observable<any> = this._authSvc.auth.user;
  
  computadoras:any[] = [];
  loading:boolean = true;
  
  constructor(private _ordenadoresService:OrdenadoresService,
              private _authSvc:AuthService,
              private router:Router) {
    
   }

  ngOnInit(): void {
    this.user$.subscribe(data => {
      if(!data){
        this.router.navigate(['/login']);  
      } 
      
    });
    this.getComputadoras();
  }

  getComputadoras(){
    this._ordenadoresService.getComputadoras().subscribe(data => {
      this.computadoras = [];

      data.forEach((element:any) => {
        
        let ultimoMant = element.payload.doc.data().ultimoMant;
        if(ultimoMant){
          ultimoMant = moment(ultimoMant.seconds*1000).format('ll');
        } else {
          ultimoMant = '--';
        }
        this.computadoras.push({
          id:element.payload.doc.id,
          uMant:ultimoMant,
          ...element.payload.doc.data()
        });
      });
      this.loading = false;
    });
  }

}
