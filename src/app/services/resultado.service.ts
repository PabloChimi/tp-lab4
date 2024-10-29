import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Resultado } from '../interface/resultado';
import { Observable } from 'rxjs';
import { ResultadoEncuesta } from '../interface/resultadoEncuesta';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private itemsCollection!: AngularFirestoreCollection<Resultado>;
  private itemsCollectionEncuesta!: AngularFirestoreCollection<ResultadoEncuesta>;
  items!: Observable<Resultado[]>;

  constructor(private firestore: AngularFirestore) { }

  enviarResultado(resultado:Resultado){
    this.firestore.collection('resultados').add(resultado);
  }

  traerResultados(){
    this.itemsCollection = this.firestore.collection<Resultado>('resultados');

    return this.itemsCollection.valueChanges()
  }

  traerResultadosEncuesta(){
    this.itemsCollectionEncuesta = this.firestore.collection<ResultadoEncuesta>('encuestas');

    return this.itemsCollectionEncuesta.valueChanges()
  }
}
