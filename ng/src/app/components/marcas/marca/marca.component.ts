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
  private update;

  pageActual: number = 1;

  constructor(
    private _marcaService: MarcaService
  ) {
    this.marca = new Marca(1,'');
    this.update = null;
   }

  ngOnInit() {
    this.getMarcas();
  }
  
  add(){
    this.update = null
    this.marca.name = ''
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
      this._marcaService.delete(marc.id).subscribe(
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
    this._marcaService.update(id, this.marca).subscribe(
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
