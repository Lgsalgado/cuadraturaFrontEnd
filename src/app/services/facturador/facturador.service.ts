import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HTTP_INTERCEPTORS, HttpParams} from '@angular/common/http';
import { TokenService} from "../session/token.service";


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
    "idOrder": "",
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
const login={
  "user": "lgsalgados",
  "password": "Zarita2013",
  "cadena": "4"
}
export class User {
  user!: String;
  password!: String;
  cadena!: String;
}

@Injectable({
  providedIn: 'root'
})
export class FacturadorService {
  constructor(private http: HttpClient,private tokenService: TokenService) {}
  // @ts-ignore
  token:string= this.tokenService.getToken()
  headers = new HttpHeaders()
    .set('X-Auth',this.token )
    .set('Content-Length','<calculated when request is sent>');
  //Apis
  facturadorReinject: string = 'https://c89bbin9ae.execute-api.us-east-1.amazonaws.com/prod/order/reinject'
  private facturadorLogin ='http://localhost:8080/api/loginFacturador'
  private facturador:string ='https://facturadorbackend.socoomni.com:8080/MTDServices/'

  sesion(): Observable<any> {
    return this.http.get(this.facturadorLogin);
  }

  errores(): Observable<any> {
    const error={
      "status": "",
        "startDate": "01/11/2023",
        "endDate": "30/11/2023",
        "store": 4,
        "ordenCompra": "",
        "typeOrder": ""
    }
    console.log(this.headers)
    return this.http.post(this.facturador+'errorsweb',error,{headers:this.headers});
  }
  empujar(): Observable<any> {
    //console.log(httpOptions);
    // @ts-ignore
    return this.http.post(this.facturadorReinject,orden,httpOptions.headers,httpOptions.params);
  }
}
