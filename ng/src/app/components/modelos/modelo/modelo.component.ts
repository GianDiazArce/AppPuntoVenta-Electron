import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [ModeloService]
})
export class ModeloComponent implements OnInit {

  public modelos;
  public modelo: Modelo;

  constructor(
    private _modeloService: ModeloService
  ) { 
    this.modelo = new Modelo(1, 0, 0, 0, '', 0);
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
          console.log(response.error);
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
  onSubmit(form){
    this._modeloService.save(this.modelo).subscribe(
      response => {
        if(response.status == 'success'){
          this.getModelos();
          this.closeModal();
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  closeModal(){
    document.getElementById('btnClose').click();
  }

}
