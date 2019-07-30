import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MarcaService]
})
export class MarcaComponent implements OnInit {

  public marcas;

  constructor(
    private _marcaService: MarcaService
  ) {

   }

  ngOnInit() {
    this.getMarcas();
  }
  
  getMarcas(){
    this._marcaService.getMarcas().subscribe(
      response => {
        if(response.status == 'success'){
          this.marcas = response.marcas;
        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
