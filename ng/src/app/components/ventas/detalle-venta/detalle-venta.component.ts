import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css'],
  providers: [VentaService]
})
export class DetalleVentaComponent implements OnInit {

  public detalleVentas;

  constructor(
    private _ventaService: VentaService,
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
        this._ventaService.getDetalleVentas(id).subscribe(
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
