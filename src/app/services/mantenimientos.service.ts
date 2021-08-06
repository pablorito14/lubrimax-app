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

  editarMantenimiento(mant:any,id:string):Promise<any>{
    return this.firestore.collection('mantenimientos').doc(id).update(mant);
  }

  getMantenimiento(id:string):Observable<any>{
    return this.firestore.collection('mantenimientos').doc(id).snapshotChanges();
  }

  getMantenimientos():Observable<any>{
    
    return this.firestore
        .collection('mantenimientos',ref => ref.orderBy('fUnix','desc'))
        .snapshotChanges();
  }

}
