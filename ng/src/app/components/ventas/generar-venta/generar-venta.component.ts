import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { TipoService } from 'src/app/services/tipo.service';
import { MarcaService } from 'src/app/services/marca.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-generar-venta',
  templateUrl: './generar-venta.component.html',
  styleUrls: ['./generar-venta.component.css'],
  providers: [ModeloService, TipoService,MarcaService, VentaService]
})
export class GenerarVentaComponent implements OnInit {

  public page_title: string;
  public modelos;
  public tipos;
  public marcas: any;
  public modelo;

  public quantity;
  public price;

  public items;
  public total;
  
  constructor(
    private _modeloService: ModeloService,
    private _tipoService: TipoService,
    private _marcaService: MarcaService,
    private _ventaService: VentaService
  ) { 
    this.quantity = 0;
    this.price = 0;
  }
// Nota:
// Al hacer la venta obtener el id de la response.venta.id creada y almacenar el detalle venta con ese id
  ngOnInit() {
    this.getTipos();    
    this.getTableModelos();
  } 
  cboModeloChange(event){
    let newVal = event.target.value;
    if(newVal == 0){
      console.log('No selecciono nada');
    } else {
      this._modeloService.getModelo(newVal).subscribe(
        response => {
          if(response.status == 'success'){
            this.modelo = response.modelo;
            console.log(this.modelo);
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
  onSubmit(form){
    this._ventaService.addItem(this.modelo, this.quantity, this.price);
    this.getTableModelos();
  }
  limpiarTabla(){
    this._ventaService.empty();
  }
  getTableModelos(){
    this._ventaService.get().subscribe(
      response => {
        this.items = response.items;
        this.total = response.itemsTotal;
      }, 
      error => {
        console.log(error);
      }
    );
  }
  

}
