import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import User from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ AuthService ]
})
export class HeaderComponent implements OnInit {
  user$:Observable<any> = this._authSvc.auth.user;

  constructor(
    private _authSvc:AuthService,
    private route:Router,
    private toastr:ToastrService
    ) { 
      
  }

  ngOnInit(): void {
    
  }

  onLogout(){
    this._authSvc.logout()
        .then((data) => {
          this.toastr.info('Sesion cerrada con éxito');
          this.route.navigate(['/login']);
        })
        .catch(error => console.log(error));
  }

  

}
