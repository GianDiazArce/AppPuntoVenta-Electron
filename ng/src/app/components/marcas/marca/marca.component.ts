import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MarcaService]
})
export class MarcaComponent implements OnInit {

  public marcas;
  public marca:Marca;

  constructor(
    private _marcaService: MarcaService
  ) {
    this.marca = new Marca(1,'');
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
  onSubmit(form){
    this._marcaService.save(this.marca).subscribe(
      response => {
        if(response.status == 'success'){
          document.getElementById('btnClose').click();
          this.getMarcas();
          form.reset();
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
