import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { MarcaService } from 'src/app/services/marca.service';
import { TallaService } from 'src/app/services/talla.service';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [ModeloService, MarcaService, TallaService, TipoService]
})
export class ModeloComponent implements OnInit {

  public modelos;
  public modelo: Modelo;

  
  public marcas;
  public tallas;

  private update;
  private btnForm : string;
  private modal_title : string;

  constructor(
    private _modeloService: ModeloService,
    private _marcaService: MarcaService, 
    private _tallaService: TallaService
  ) { 
    this.modelo = new Modelo(1, 0, 0, '', 0);
  }

  ngOnInit() {
    this.getModelos();
    this.cargarComboBoxes();
  }

  cargarComboBoxes(){
    this._marcaService.getMarcas().subscribe(
      res => {
        if(res.status == 'success'){
          this.marcas = res.marcas
        }
      },
      err => {
        console.log(err);
      }
    );    
    this._tallaService.getTallas().subscribe(
      res => {
        this.tallas = res.tallas;
      },
      err => {
        console.log(err);
      }
    );
    
  }
  add(){
    this.modelo = new Modelo(1,0,0,'',0);
    this.update = null;
    this.btnForm = 'Crear';
    this.modal_title = 'Crear nuevo modelo';
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
  closeModal(){
    document.getElementById('btnClose').click();
  }
  preUpdate(model){
    this.update = true;
    this.btnForm = 'Actualizar';
    this.modal_title = 'Editar el modelo: ' + model.name
    this._modeloService.getModelo(model.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.modelo = response.modelo; 
        }
      }
    )
  }
  updateModel(id){
    this._modeloService.update(id, this.modelo).subscribe(
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
    );
  }
  deleteModel(model){
    if(confirm('Desea eliminar el modelo - '+ model.name)){
      this._modeloService.delete(model.id).subscribe(
        response => {
          if(response.status == 'success'){
            this.getModelos();
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
