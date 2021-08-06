import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cerrarMenu(){
    // console.log('cerrar menu');
    // var menu = document.getElementById('navbarNavDropdown');
    // menu?.classList.remove('show');
  }

}
