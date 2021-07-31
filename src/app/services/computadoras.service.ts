import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputadorasService {

  constructor(private firestore:AngularFirestore) { }

  getComputadoras():Observable<any>{
    return this.firestore.collection('ordenadores', ref => ref.orderBy('nombre'))
                        .snapshotChanges();
  }
}
