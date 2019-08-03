import { Component, OnInit } from '@angular/core';
import { TipoService } from 'src/app/services/tipo.service';
import { Tipo } from 'src/app/models/tipo';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],
  providers: [TipoService]
})
export class TipoComponent implements OnInit {

  public tipos;
  public tipo: Tipo;
  pageActual: number = 1;
  private update = null;
  public modal_title: string;
  public btnForm;

  constructor(
    private _tipoService: TipoService
  ) {
    this.tipo = new Tipo(1,'');    
   }

  ngOnInit() {
    this.getTipos();
    
  }
  add(){
    this.update = null;
    this.modal_title = 'Crear nuevo tipo';
    this.btnForm = 'Crear';
    this.tipo.name = '';
  }

  getTipos(){
    this._tipoService.getTipos().subscribe(
      response => {
        if(response.status == 'success'){
          this.tipos = response.tipos;
        } else {
          console.log(response.error);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(form){
    this._tipoService.save(this.tipo).subscribe(
      response => {
        if(response.status == 'success'){          
          this.getTipos();
          this.closeModal();
          form.reset();
        } else {
          console.log(response.error);
        }
      },
      error =>{
        console.log(error);
      }
    );
  }
  preUpdateTipo(tip){
    this.modal_title = 'Actualizar tipo';
    this.btnForm = 'Actualizar';
    this.update = true;
    this._tipoService.getTipo(tip.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.tipo = response.tipo;
        } else {
          console.log(response.message)
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

  updateTipo(tipo){
    this._tipoService.update(tipo.id, this.tipo).subscribe(
      response => {
        if(response.status == 'success'){
          this.getTipos();
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
  deleteTipo(tip){
    if(confirm('¿Está seguro de eliminar ' + tip.name)){
      this._tipoService.delete(tip.id).subscribe(
        response => {
          if(response.status == 'success'){
            this.getTipos();
          } else {
            console.log(response.message)
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
