import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css'],
  providers: [SaleService]
})
export class DetalleVentaComponent implements OnInit {

  public detalleVentas;

  constructor(
    private _saleService: SaleService,
    private _route: ActivatedRoute 
  ) {

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
