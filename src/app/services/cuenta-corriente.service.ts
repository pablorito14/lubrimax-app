import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaCorrienteService {

  constructor( private firestore:AngularFirestore) { }

  guardarCosto(costo:any):Promise<any>{
    return this.firestore.collection('ctaCte').add(costo);
  }

  eliminarCosto(id:any):Promise<any>{
    return this.firestore.collection('ctaCte').doc(id).delete();
  }

  getCuentaCorriente():Observable<any>{
    return this.firestore.collection('ctaCte', 
        ref => 
          ref.orderBy('fecha','desc').orderBy('fechaCreacion','desc'))
      .snapshotChanges();
  }
}
