import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase/app';
import { first, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedin:any;
  constructor(public auth:AngularFireAuth,
              private firestore:AngularFirestore) { 
                
               }

    async login(){
      try {
        const result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        // const result = await this.auth.signInWithEmailAndPassword(email,password); 
        return result;  
      } catch (error) {
        console.log(error);
      }
      return null;
    }

    async register(){
      try {
        const result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        // const result = await this.auth.signInWithEmailAndPassword(email,password); 
                      // .then(userData => {
                      //   if(userData.user){
                      //     const data = { email: userData.user.email, role: { admin: true }
                      //     }
                      //     this.firestore.collection('users').doc(userData.user.uid).set(data);       
                      //   }
                      // })
        return result;  
      } catch (error) {
        console.log(error);
      }
      return null;
    }
  
    async saveUser(user:any){
      try {
        const data = { email: user.user.email, role: { admin: true } }
        const result = this.firestore.collection('users').doc(user.user.uid).set(data);
        return result;
      } catch (error) {
        console.log(error);
      }
      return null;
    }
  
    async logout(){
      try {
        const result = await this.auth.signOut();
        return result;
      } catch (error) {
        console.log(error)
      }
      // console.log('asdasd');
      // await this.auth.signOut();
      return null;
    }
  
    async isUserAuth(user:any){
      try{
        const result = this.firestore.collection('users', ref => ref.where('email','==',user.email)).snapshotChanges();
        // const result = await this.firestore.collection('users').doc(user.user.uid).valueChanges();
        return result;
      } catch (error){
        console.log(error);
      }
      return null;
        
    }
    isUserAuth2(user:any){
      // try{
        const result = this.firestore.collection('users', ref => ref.where('email','==',user.user.email)).snapshotChanges();
        // const result = await this.firestore.collection('users').doc(user.user.uid).valueChanges();
        return result;
      // } catch (error){
      //   console.log(error);
      // }
      // return null;
        
    }

    
}
