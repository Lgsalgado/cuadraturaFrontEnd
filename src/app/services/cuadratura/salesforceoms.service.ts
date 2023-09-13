import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SalesforceomsService {
  baseUrl = 'https://jsonplaceholder.typicode.com/';
  baseUrl2 = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) { }

  lista(): Observable<any> {
    return this.http.get(this.baseUrl + 'users/');
  }
  listaProductos(): Observable<any> {
    return this.http.get(this.baseUrl2 + 'products/');
  }
  viewRequest(id: any): Observable<any> {
    console.log(id);
    return this.http.get(this.baseUrl +`users/${id}`);
  }

}
