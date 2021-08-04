import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor(private firestore:AngularFirestore) { }

  agregarMantenimiento(mantenimiento:any):Promise<any>{
    return this.firestore
        .collection('mantenimientos')
        .add(mantenimiento);
  }

  getMantenimientos():Observable<any>{
    
    return this.firestore
        .collection('mantenimientos',ref => ref.orderBy('fUnix','desc'))
        .snapshotChanges();
  }

}
