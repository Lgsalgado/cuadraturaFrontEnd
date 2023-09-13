import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SalesforceomsService {
  baseUrl = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  lista(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }

}
