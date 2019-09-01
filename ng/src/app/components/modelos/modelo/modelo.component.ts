import { Component, OnInit } from '@angular/core';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { MarcaService } from 'src/app/services/marca.service';
import { TallaService } from 'src/app/services/talla.service';
import { TipoService } from 'src/app/services/tipo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [ModeloService, MarcaService, TallaService, TipoService, UserService]
})
export class ModeloComponent implements OnInit {

  public modelos;
  public modelo: Modelo;

  public models;

  
  public marcas: any;
  public tallas: any;
  public tipos: any;
  public tipo_id: number;

  public cboMarcas;

  private update;
  private btnForm : string;
  private modal_title : string;
  public newName: boolean;

  public token: string;
  public role: string;
  
  constructor(
    private _modeloService: ModeloService,
    private _marcaService: MarcaService, 
    private _tallaService: TallaService,
    private _userService: UserService,
    private _tipoService: TipoService
  ) { 
    this.modelo = new Modelo(1, 0, 0, '', 0);
    this.token = this._userService.getToken();
    this.newName = true;
    this.role = this._userService.getRol();
  }

  ngOnInit() {
    //this.getModelos();
    this.cargarComboBoxes();
  }
  rbName(event){
    let value = event.target.value;
    if(value === 'usingName'){
      this.newName = false;
    } else {
      this.newName = true;
    }
  }
  cboTipo(event){
    let tipo_id = event.target.value;
    if(tipo_id == undefined || tipo_id == 'undefined'){
      console.log('error');
    } else {
      this._marcaService.getMarcaByTipo(tipo_id).subscribe(res => this.cboMarcas = res.marcas , err => console.log(err));
    }
    
  }
  cboMarcaChange(event){
    let newVal = event.target.value;
    this._modeloService.getModeloByMarca(newVal).subscribe(res => this.modelos = res.modelos , err => console.log(err))
    
  }

  cargarComboBoxes(){
     
    this._tallaService.getTallas().subscribe(
      res => {
        this.tallas = res.tallas;
      },
      err => {
        console.log(err);
      }
    );
    this._tipoService.getTipos().subscribe(
      res => {
        this.tipos = res.tipos;
      },
      error => {
        console.log(error);
      }
    );
    this._modeloService.getModelos().subscribe(
      
      res => {
        var names = res.modelos.map(function (person) { return person.name; });
        var sorted = names.sort();
        var unique = sorted.filter(function (value, index) {
          return value !== sorted[index + 1];
      });
      this.models = unique;
      },
      err => {
        console.log(err);
      }
    )
    
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
          console.log(this.modelos);
          
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
    this._modeloService.save(this.modelo, this.token).subscribe(
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
    this.tipo_id = model.marca.tipo_id;
    this.getMarcasByTipo(this.tipo_id);
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
    this._modeloService.update(id, this.modelo, this.token).subscribe(
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
      this._modeloService.delete(model.id, this.token).subscribe(
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

}
