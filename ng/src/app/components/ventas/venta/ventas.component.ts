import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';



@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [SaleService, UserService, DetalleVentaService]
})
export class VentasComponent implements OnInit {

  public ventas;
  public total = 0;
  public month;
  public token;
  private day: number;
  private mes;
  private fecha = [
    "Enero", "Febrero", "Marzo", "Abril", 
    "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ];
  
  constructor(
    private _ventaService: SaleService,
    private _userService: UserService,
    private _detalleVentaService: DetalleVentaService
  ) { 
    this.token = this._userService.getToken();
    
  }

  ngOnInit() {
    this.getDate();
  }

  extraerMes(num){
    let n = num - 1;
    this.month = this.fecha[n];
  }

  getDate(){
    this.mes = parseInt(new DatePipe('es-PE').transform(Date.now(), 'M')); 
    this.saleByMonth(this.mes);   
    this.extraerMes(this.mes);
  }
  ventaByDay(d){
    this.total = 0;
    if(this.day == 0){
      this._ventaService.getVentasByMes(this.mes, this.token).subscribe(
        response => {
          this.ventas = response.ventas;
          response.ventas.forEach(element => {
            this.total += element.total;
          });
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this._ventaService.getVentasByDayAndMonth(d, this.mes, this.token).subscribe(
        response => {
          if(response.status == 'success'){
            this.ventas = response.ventas;
            response.ventas.forEach(element => {
              this.total += element.total;
            });
          } else {
            console.log('error');
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    
  }
  cambiaMes(ev){
    let mes = ev.target.value;
    this.month = this.fecha[mes - 1];
    this.saleByMonth(mes);
  }
  saleByMonth(mes: number){
    this.total = 0;
    this._ventaService.getVentasByMes(mes, this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.ventas = response.ventas;
          response.ventas.forEach(element => {
            this.total += element.total;
          });
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  delete(vent){
    if(confirm('¿Estas seguro de eliminar este venta?')){
      
      this._ventaService.delete(vent.id, this.token).subscribe(
        response => {
          if(response.status == 'success'){
            this.getDate();
          } else {
            console.log('hubo un error');
          }
        },
        error => {
          console.log(error);
        }
      )
    }
    
  }

}
