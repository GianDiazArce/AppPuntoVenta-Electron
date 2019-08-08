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
  options;
  constructor(
    private _modeloService: ModeloService,
    private _tipoService: TipoService,
    private _marcaService: MarcaService
  ) { 

  }

  ngOnInit() {
    this.getTipos();    
  } 
  cboModeloChange(event){
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
    let newVal =  event.target.value;
    this.getMarcasByTipo(newVal);
    
  }
  getMarcasByTipo(tipo_id){
    this._marcaService.getMarcaByTipo(tipo_id).subscribe(
      response => {
        if(response.status == 'success'){
          this.marcas = response.marcas;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  cboMarcaChange(event){
    let newVal = event.target.value;
    this.getModelosByMarca(newVal);
    
  }
  getModelosByMarca(marca_id){
    this._modeloService.getModeloByMarca(marca_id).subscribe(
      response => {
        if(response.status == 'success'){
          this.modelos = response.modelos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  

}
