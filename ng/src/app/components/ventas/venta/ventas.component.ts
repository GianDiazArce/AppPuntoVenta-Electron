import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [SaleService]
})
export class VentasComponent implements OnInit {

  public ventas;

  constructor(
    private _ventaService: SaleService
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
