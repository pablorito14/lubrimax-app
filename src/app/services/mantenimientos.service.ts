import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor(private firestore:AngularFirestore) { }

  agregarMantenimiento(mantenimiento:any):Promise<any>{
    return this.firestore.collection('mantenimientos').add(mantenimiento);
  }


}
