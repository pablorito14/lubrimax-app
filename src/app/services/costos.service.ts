import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostosService {

  constructor(private firestore:AngularFirestore) { }

  getConceptos():Observable<any>{
    return this.firestore
          .collection('valores')
          .snapshotChanges();
  }

  getConcepto(id:string):Observable<any>{
    return this.firestore
          .collection('valores')
          .doc(id).snapshotChanges();
  }

  actualizarConcepto(id:string,concepto:any):Promise<any>{
    return this.firestore
          .collection('valores')
          .doc(id).update(concepto);
  }

  agregarConcepto(concepto:any):Promise<any>{
    return this.firestore.collection('valores').add(concepto);
  }

  
}
