import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdenadoresService } from '../../services/ordenadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-pc',
  templateUrl: './editar-pc.component.html',
  styleUrls: ['./editar-pc.component.css']
})
export class EditarPcComponent implements OnInit {
  createOrdenador:FormGroup;
  id:string | null;
  disable_cod = true;
  submitted = false;
  loading = false;
  titulo:string = 'Agregar ordenador';

  constructor(
      private fb:FormBuilder,
      private _ordenadoresService:OrdenadoresService,
      private router:Router,
      private toastr:ToastrService,
      private aRoute:ActivatedRoute
  ) { 
    
    this.createOrdenador = this.fb.group({
      cod: [''],
      teamviewer: ['',Validators.required],
      nombre_equipo: [''],
      ip_fija: ['',Validators.pattern(/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/gm)],
      tipo: ['',Validators.required],
    });
    
    this.id = this.aRoute.snapshot.paramMap.get('id');
    
    this.createOrdenador.get('teamviewer')?.valueChanges.subscribe(tw => {
      var cod:string = tw;
      cod = cod.toLowerCase();
      cod = cod.replace(/ /g,'-');
      this.createOrdenador.get('cod')?.setValue(cod);
    });
  }

  ngOnInit(): void {
    this.editar();
  }

  
  
    
  setMayus(tw:any){
    tw.value = tw.value.toUpperCase();
  }

  agregarEditarOrdenador(){
    this.submitted = true;
    if(this.createOrdenador.invalid){
      return;
    }

    if(this.id === null){
      this.agregarOrdenador();
    } else {
      this.editarOrdenador(this.id);
    }

    
  }

  agregarOrdenador(){
    const ordenador:any = {
      cod: this.createOrdenador.value.cod,
      teamviewer: this.createOrdenador.value.teamviewer,
      ip_fija: this.createOrdenador.value.ip_fija,
      nombre_equipo: this.createOrdenador.value.nombre_equipo,
      tipo: this.createOrdenador.value.tipo,
    }

    this.loading = true;
    this._ordenadoresService
          .agregarOrdenador(ordenador)
          .then(() => {
            this.loading = false;
            this.toastr.success('Computadora agregada');
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.log(error);
            this.toastr.error('Ocurrio un error');
            this.loading = false;
          })
  }

  editarOrdenador(id:string){
    const ordenador:any = {
      cod: this.createOrdenador.value.cod,
      teamviewer: this.createOrdenador.value.teamviewer,
      ip_fija: this.createOrdenador.value.ip_fija,
      nombre_equipo: this.createOrdenador.value.nombre_equipo,
      tipo: this.createOrdenador.value.tipo,
      fechaCreacion: new Date()
    } 
    
    this.loading = true;
    this._ordenadoresService.actualizarOrdenador(id,ordenador)
          .then(() => {
            this.loading = false;
            this.toastr.success('Datos de la computadora actualizados');
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.log(error);
            this.toastr.error('Ocurrio un error');
          })
  }

  editar(){
    if(this.id !== null){
      this.titulo = "Editar ordenador";
      this._ordenadoresService.getComputadora(this.id).subscribe(data => {
        this.createOrdenador.setValue({
          cod: data.payload.data()['cod'],
          teamviewer: data.payload.data()['teamviewer'],
          nombre_equipo: data.payload.data()['nombre_equipo'],
          ip_fija: data.payload.data()['ip_fija'],
          tipo: data.payload.data()['tipo']
        });
      });
      
    }
  }

}
