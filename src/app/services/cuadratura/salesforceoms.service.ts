import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HTTP_INTERCEPTORS, HttpParams} from '@angular/common/http';

// @ts-ignore
const httpOptions={
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Content-Length':'<calculated when request is sent>',
    'Host':"<calculated when request is sent>",
    'User-Agent':'PostmanRuntime/7.34.0',
    'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate, br',
    'Connection':'keep-alive',
    '8f2c4087cd5d9ba126c6be31a3dcf575':''

    }),
  params: new HttpParams().set('access_token','APP_USR-7813988140598213-110613-7ab2513303e49eac106225e715756d57-486481632')
}
const token='15223366'
const header={
  'Content-Type':'application/json',
  'Content-Length':'<calculated when request is sent>',
  'Host':"<calculated when request is sent>",
  'User-Agent':'PostmanRuntime/7.34.0',
  'Accept':'*/*',
  'Accept-Encoding':'gzip, deflate, br',
  'Connection':token,
  '8f2c4087cd5d9ba126c6be31a3dcf575':''

}
export const orden={
  "trxHdr": {
    "version": "1.0",
    "context": {
      "idCompany": "DIFARMA",
      "idCountry": "EC",
      "idStore": "FYBECA",
      "idChannel":"OMS"
    },
    "trxClientExecDate": "{{CURRENT_TIME}}"
  },
  "trxIdentify": {
    "orderType": 1,
    "idOrder": "FCC10006906",
    "idEvent": 6319011
  },
  "trxInject": {
    "type": "CONTINUE",
    "origin": "Generar_Factura"
  }
}
const rango={
  "status": "",
  "startDate": "01/11/2023",
  "endDate": "01/11/2023",
  "store": 4,
  "ordenCompra": "",
  "typeOrder": ""
}


@Injectable({
  providedIn: 'root'
})
export class SalesforceomsService {
  baseUrl = 'https://jsonplaceholder.typicode.com/';
  baseUrl2 = 'https://fakestoreapi.com/';
  facturadorReinject: string = 'https://c89bbin9ae.execute-api.us-east-1.amazonaws.com/prod/order/reinject'
  constructor(private http: HttpClient) { }

  lista(): Observable<any> {
    console.log(httpOptions);
    // @ts-ignore
    return this.http.post(this.facturadorReinject,orden,httpOptions.headers,httpOptions.params);
  }
  listaProductos(): Observable<any> {
    return this.http.get(this.baseUrl2 + 'products/');
  }
  viewRequestviewRequest(id: any): Observable<any> {
    console.log(id);
    return this.http.get(this.baseUrl +`users/${id}`);
  }

}
