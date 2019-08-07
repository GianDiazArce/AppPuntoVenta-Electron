import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { TipoService } from 'src/app/services/tipo.service';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-generar-venta',
  templateUrl: './generar-venta.component.html',
  styleUrls: ['./generar-venta.component.css'],
  providers: [ModeloService, TipoService,MarcaService]
})
export class GenerarVentaComponent implements OnInit {

  public page_title: string;
  public modelos;
  public tipos;
  public marcas: any;
  constructor(
    private _modeloService: ModeloService,
    private _tipoService: TipoService
  ) { 

  }

  ngOnInit() {
    this.getTipos();    
  } 
  cboSelectChange(event){
    let newVal = event.target.value;
    console.log(newVal);    
  }
  getTipos(){
    this._tipoService.getTipos().subscribe(
      response => {
        this.tipos = response.tipos
      },
      error => {
        console.log(error);
      }
    )
  }
  cboTipoChange(event){
    localStorage.removeItem('tipo_id');
    let newVal =  event.target.value;    
    this.getMarcasByTipo(newVal);
    localStorage.setItem('tipo_id', newVal);
    
  }
  getMarcasByTipo(id){
    this._modeloService.getMarcasByTipo(id).subscribe(
      response => {
        this.marcas = response.modelos;
        console.log(this.marcas);
        
      },
      error => {
        console.log(error);
      }
    )
  }
  cboMarcaChange(event){
    let tipo_id = localStorage.getItem('tipo_id');
    let newVal = event.target.value;
    this._modeloService.getModeloByTipoAndMarca(tipo_id, newVal).subscribe(
      response => {
        this.modelos = response.modelos;
        console.log(this.modelos);
      },
      error => {
        console.log(error);
      }
    )
  }

}
