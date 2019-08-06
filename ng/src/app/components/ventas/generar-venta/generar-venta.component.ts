import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-generar-venta',
  templateUrl: './generar-venta.component.html',
  styleUrls: ['./generar-venta.component.css'],
  providers: [ModeloService]
})
export class GenerarVentaComponent implements OnInit {

  public page_title: string;
  public modelos;
  constructor(
    private _modeloService: ModeloService
  ) { 

  }

  ngOnInit() {
    this.getModelos();
  }
  getModelos(){
    this._modeloService.getModelos().subscribe(
      response => {
        if(response.status == 'success'){
          this.modelos = response.modelos;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  cboSelectChange(event){
    let newVal = event.target.value;
    console.log(newVal);
    
  }

}
