import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenadoresService {
  constructor(private firestore:AngularFirestore) {
  }

  agregarOrdenador(ordenador:any):Promise<any>{
    return this.firestore.collection('ordenadores').add(ordenador);
  }

  getComputadoras():Observable<any>{
    return this.firestore.collection('ordenadores', ref => ref.orderBy('teamviewer','desc')).snapshotChanges();
  }

  getComputadora(id:string):Observable<any>{
    return this.firestore.collection('ordenadores').doc(id).snapshotChanges();
  }

  actualizarOrdenador(id:string,data:any){
    return this.firestore.collection('ordenadores').doc(id).update(data);
  }
}