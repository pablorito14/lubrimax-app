import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
// import { InputDateComponent } from '../../components/input-date/input-date.component';
// import { CuentaCorrienteService } from '../../services/cuenta-corriente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-facturaciones',
  templateUrl: './list-facturaciones.component.html',
  styleUrls: ['./list-facturaciones.component.css']
})
export class ListFacturacionesComponent implements OnInit {
  loading:boolean = true;
  
  constructor() { }

  ngOnInit(): void {
    
    
  }
  
}
