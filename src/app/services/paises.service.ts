import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interface/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private apiUrl: string = "https://restcountries.com/v3.1/all";

  get httpParams(){
    return new HttpParams().set('fields','name,flags');
  }

  constructor(private http:HttpClient) { }

  traerPaises():Observable<Pais[]>{
    return this.http.get<Pais[]>(this.apiUrl,{params: this.httpParams});
  }
  
}
