import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentaService]
})
export class VentasComponent implements OnInit {

  public ventas;

  constructor(
    private _ventaService: VentaService
  ) { }

  ngOnInit() {
    this.getVentas();
    
  }
  getVentas(){
    this._ventaService.getVentas().subscribe(
      response => {
        if(response.status == 'success'){
          this.ventas = response.ventas;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
