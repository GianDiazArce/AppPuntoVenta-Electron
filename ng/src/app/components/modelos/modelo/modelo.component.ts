import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [ModeloService]
})
export class ModeloComponent implements OnInit {

  public modelos;

  constructor(
    private _modeloService: ModeloService
  ) { }

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

}
