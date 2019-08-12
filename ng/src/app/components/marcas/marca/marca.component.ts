import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from 'src/app/models/marca';
import { TipoService } from 'src/app/services/tipo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MarcaService, TipoService, UserService]
})
export class MarcaComponent implements OnInit {

  public marcas;
  public marca:Marca;
  private update;
  public tipos;

  public token;
  public role;

  pageActual: number = 1;

  constructor(
    private _marcaService: MarcaService,
    private _tipoService: TipoService,
    private _userService: UserService
  ) {
    this.marca = new Marca(1,0,'');
    this.update = null;
    this.token = this._userService.getToken();
    this.role = this._userService.getRol();
   }

  ngOnInit() {
    this.getMarcas();
    this.getTipos();
  }
  
  add(){
    this.update = null
    this.marca.name = ''
  }
  getTipos(){
    this._tipoService.getTipos().subscribe(
      response => {
        if(response.status == 'success'){
          this.tipos = response.tipos;
        }
      },
      error => {
        console.log(error);
      }
    )
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
    this._marcaService.save(this.marca, this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.closeModal();
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
  preUpdateMarca(marc){
    this._marcaService.getMarca(marc.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.update = true;
          this.marca = response.marca;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  delete(marc){
    if(confirm('¿Esta seguro que quiere eliminar esta marca?')){
      this._marcaService.delete(marc.id, this.token).subscribe(
        response => {
          if(response.status == 'success'){
            this.getMarcas();
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
  updateMarca(id){
    this._marcaService.update(id, this.marca, this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.getMarcas();
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
