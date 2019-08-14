import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { Venta } from 'src/app/models/venta';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css'],
  providers: [SaleService, DetalleVentaService]
})
export class DetalleVentaComponent implements OnInit {

  public detalleVentas;
  public price = 0;
  public venta: Venta;
  public user_id;
  public fecha;
  constructor(
    private _saleService: SaleService,
    private _route: ActivatedRoute 
  ) {
    this.venta = new Venta(0,0,0,0,'');
    
    
   }

  ngOnInit() {
    this.getDetalleVentas();
  }
  getDetalleVentas(){
    this._route.params.subscribe(
      params => {
        let id = params.id;
        this._saleService.getDetalleVentas(id).subscribe(
          response => {
            if(response.status == 'success'){
              this.detalleVentas = response.detalleVentas;
              
              response.detalleVentas.forEach(detail => {
                //this.price += parseInt(detail.price);
                this.venta = detail.venta;
                this.fecha = detail.created_at;
              });
              //this.price = this.venta.total;
              
            } else {
              console.log(response.message);
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  

}
