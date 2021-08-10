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
    return this.firestore.collection('ordenadores', ref => ref.orderBy('estado','desc').orderBy('teamviewer','desc')).snapshotChanges();
  }

  getComputadorasActivas():Observable<any>{
    return this.firestore.collection('ordenadores', ref => ref.where('estado','==',true).orderBy('teamviewer','desc')).snapshotChanges();
  }

  getComputadora(id:string):Observable<any>{
    return this.firestore.collection('ordenadores').doc(id).snapshotChanges();
  }

  actualizarOrdenador(id:string,data:any){
    return this.firestore.collection('ordenadores').doc(id).update(data);
  }

  compUnique(teamviewer:string):Observable<any>{
    return this.firestore.collection('ordenadores', ref => ref.where('estado','==',true).where('teamviewer','==',teamviewer)).get();
    // return this.firestore.collection('ordenadores').snapshotChanges();
  }

  buscarOrdenador(cod:string):Observable<any>{
    return this.firestore.collection('ordenadores',ref => ref.where('cod','==',cod)).get();
  }

  actUltimoMant(id:string,ultimoMant:Date):Promise<any>{
    return this.firestore.collection('ordenadores').doc(id).update({'ultimoMant':ultimoMant});
  }
}
