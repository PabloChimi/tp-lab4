import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from '../interface/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private itemsCollection!: AngularFirestoreCollection<Encuesta>;
  items!: Observable<Encuesta[]>;
  constructor(private firestore: AngularFirestore) { }

  enviarEncuesta(encuesta:Encuesta){
    this.firestore.collection('encuestas').add(encuesta);
  }
}
