import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private ngUnsubscribe = new Subject()
  user$:Observable<any> = this._authSvc.auth.user;

  json:any = null;
  json2:any = null;
  loadingForm: boolean =false;
  processLogin:boolean = false;
  processRegister:boolean = false;
  userAuth:boolean = false;

  constructor( private _authSvc:AuthService,
              private router:Router,
              private toastr:ToastrService) { 
                
               }

  ngOnInit(): void {
    
  }

  onLogin(){
    this.processLogin = true;
    this._authSvc.login().then(user => {
      if(user){
        // console.log(user);
        this._authSvc.isUserAuth2(user).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data:any) => {
          if(data.length > 0){
            let nombre = user.user?.displayName;
            nombre = nombre?.split(' ')[0];
            this.toastr.success('Bienvenido '+nombre);
            this.router.navigate(['/historial-mant']);
          } else {
            this.toastr.error('usuario no autorizado');
            this.router.navigate(['/403']);
          }
        })
      }
    })
    .catch(error => console.log(error) )
    .finally(() => this.processLogin=false);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    
  }

}
