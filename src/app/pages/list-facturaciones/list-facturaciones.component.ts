import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-facturaciones',
  templateUrl: './list-facturaciones.component.html',
  styleUrls: ['./list-facturaciones.component.css']
})
export class ListFacturacionesComponent implements OnInit {
  loading:boolean = true;
  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
