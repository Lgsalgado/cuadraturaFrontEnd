import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgFor} from "@angular/common";
import {NgbAlertConfig,NgbAlertModule,NgbDateStruct, NgbCalendar, NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import {FacturadorService} from "../../../services/facturador/facturador.service";
import {MatTableModule} from "@angular/material/table";
import {NgIconComponent} from "@ng-icons/core";
import {provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers,heroWifi } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/session/auth.service";
import {TokenService} from "../../../services/session/token.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {SalesforceomsService} from "../../../services/cuadratura/salesforceoms.service";
import {concatMap, delay, interval, Observable, take} from "rxjs";
import { HttpClient } from '@angular/common/http';

export interface Solicitud {
  id: number;
  username: string;
  name: string;
  email: string;
}
export interface Orden{
  orden: string;
  idEvent: number;
}
@Component({
  selector: 'app-facturador',
  standalone: true,
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.scss'],
  imports: [NgFor, NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
    DatePipe,
    MatTableModule,
    NgIconComponent,
    CommonModule, MatInputModule],
  providers: [NgbAlertConfig],
  viewProviders: [provideIcons({ featherAirplay, heroUsers,heroWifi})]
})

export class FacturadorComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'user',
    'name',
    'email',
    'actionsColumn'
  ];
  solicitudForm: FormGroup;
  solicitud: Solicitud[] = [];
  dataSource: any;
  aux:any;
  model: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;
  err: any;
  ordenInput: string = ''
  mostrarBotonVerificarOrden: boolean = true;
  ordenReinject: Orden={
    orden:"",idEvent:0
  }
  @Input() public alerts: Array<string> = [];
  public ordenes: Array<Orden> = [
    {orden:"F00370691",idEvent:7430892}
  ];

  constructor(
    alertConfig: NgbAlertConfig,
    public router: Router,
    private calendar: NgbCalendar,
    private facturadorService: FacturadorService,
    private salesforceService : SalesforceomsService,
    private token: TokenService,
    private httpClient: HttpClient,
    private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      salesforce: ['', [Validators.required]],
      oms: ['', [Validators.required]],
    });
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }
  ngOnInit(): void {
    this.model = this.calendar.getToday();
    //console.log(this.model.year)
  }
  //Realizar cuadratura
  login(): void {

    this.facturadorService.sesion().subscribe(

      (data) => {
        console.log("ingreso");
        this.responseHandler(data);
      },
      (error) => {
        this.err = error;
        Swal.fire({
          title: 'Error!',
          text: this.err.message+" status: "+this.err.status,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      },
      () => {
        this.router.navigate([`dashboard/facturador/`]);
      }
    );
  }
  //Enviar con pausa
  enviarListaConPausa(): void {
    interval(2500)  // Pausa de 1 segundo (1000 milisegundos)
      .pipe(
        take(this.ordenes.length),  // Tomar tantos elementos como la longitud de la lista
        concatMap(index => this.enviarOrden(index))
      )
      .subscribe(
        () => console.log('Orden enviada exitosamente'),
        error => console.error('Error al enviar orden:', error),
        () => console.log('Envío de órdenes completado')
      );
  }


  private enviarOrden(index: number): Observable<any> {
    if(index==-1){
      return this.facturadorService.empujar(this.ordenReinject.orden, this.ordenReinject.idEvent)
        .pipe(
          delay(500)  // Opcional: Pausa adicional de medio segundo (500 milisegundos)
        );
    }else{
      const ordenActual = this.ordenes[index];
      //const url = 'https://c89bbin9ae.execute-api.us-east-1.amazonaws.com/prod/order/reinject';

      return this.facturadorService.empujar(ordenActual.orden, ordenActual.idEvent)
        .pipe(
          delay(500)  // Opcional: Pausa adicional de medio segundo (500 milisegundos)
        );
    }
  }
  empujarOrden(): void {
    interval(1000)  // Pausa de 1 segundo (1000 milisegundos)
      .pipe(
        take(this.ordenes.length),  // Tomar tantos elementos como la longitud de la lista
        concatMap(index => this.enviarOrden(-1))
      )
      .subscribe(
        () => console.log('Orden enviada exitosamente'),
        error => console.error('Error al enviar orden:', error),
        () => console.log('Envío de órden completado')
      );
  }


  //función para verificar orden
  // @ts-ignore
  buscarOrden(): Observable<any> {
    console.log(this.ordenInput)
     this.facturadorService.searchIdEvent(this.ordenInput).subscribe(response => {
       this.ordenReinject.idEvent= Number(response)
       this.ordenReinject.orden= this.ordenInput
       //empujar orden
       this.empujarOrden()
       // Oculta el botón después de presionarlo
       this.mostrarBotonVerificarOrden = false;
     }, error => {
       console.error('Error en la solicitud:', error);
       Swal.fire({
         title: 'Error!',
         text: " status: "+error.error.error+" -> "+ error.status ,
         icon: 'error',
         confirmButtonText: 'Aceptar'
       })
       // Manejar el error según sea necesario
     });
  }

  //ordenes
  setOrdenes():void{
    for (let orden of this.ordenes){
      setTimeout(()=>{
        console.log("es la orden "+ orden.orden)
        this.prueba(orden.orden,orden.idEvent)
      },1000)
    }

  }
prueba(orden: string, idEvent:number):void{
      this.facturadorService.empujar(orden,idEvent).subscribe(
        (data) => {
         console.log(data)
        },
        (error) => {
          this.err = error;
          Swal.fire({
            title: 'Error!',
            text: this.err.message+" status: "+this.err.status,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })

        },
        () => {
          //this.router.navigate([`dashboard/facturador/`]);
        }
      )
}



  onFileSelect(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['salesforce'].setValue(file);
    }else {
      Swal.fire(
        'No existe archivo adjunto'
      )
    }
  }
  onFileSelect1(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['oms'].setValue(file);
    }else {
      Swal.fire(
        'No existe archivo adjunto'
      )
    }
  }

  responseHandler(jwt: { token: string }) {
    this.token.handleData(jwt.token);
  }
}
