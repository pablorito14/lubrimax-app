import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.css']
})
export class NoAuthComponent implements OnInit {

  constructor( private _authSvc:AuthService) { 
    this._authSvc.logout();
  }

  ngOnInit(): void {
  }

}
