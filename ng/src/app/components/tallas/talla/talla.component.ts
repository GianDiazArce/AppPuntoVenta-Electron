import { Component, OnInit } from '@angular/core';
import { TallaService } from 'src/app/services/talla.service';
import { Talla } from 'src/app/models/talla';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-talla',
  templateUrl: './talla.component.html',
  styleUrls: ['./talla.component.css'],
  providers: [TallaService]
})
export class TallaComponent implements OnInit {

  public tallas;
  public talla: Talla;
  private update;
  public status;
  private accion;
  
  

  pageActual: number = 1;
  constructor(
    private _tallaService: TallaService
  ) { 
    this.talla = new Talla(1,'');
    this.update = null;
  }

  ngOnInit() {
    this.getTallas();
  }

  
  add(){
    this.update = null;
  }
  getTallas(){
    this._tallaService.getTallas().subscribe(
      response => {
        if(response.status == 'success'){
          this.tallas = response.tallas;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(form){   
    this._tallaService.save(this.talla).subscribe(
      response => {
        if(response.status == 'success'){
          this.getTallas();
          this.closeModal();
          
        } else {
          console.log(response.error);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  preUpdateTalla(tall){
    this.update = true;
    this._tallaService.getTalla(tall.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.talla = response.talla;
        } else {
          console.log(response.message);
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  closeModal(){
    document.getElementById('btnClose').click();
  }
  updateTalla(id){
    this.accion = 'actualizada'
    this._tallaService.update(id, this.talla).subscribe(
      response => {
        if(response.status == 'success'){
          this.getTallas();
          this.closeModal();
          this.status = 'success';
        } else {
          console.log(response.message);
          this.status = 'error';
        }        
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }
  deleteTalla(tall){
    if(confirm('Seguro de eliminar')){
      
      this._tallaService.delete(tall.id).subscribe(
        response => {
          if(response.status == 'success'){
            this.accion = 'eliminada';
            this.status = 'success';
            this.getTallas();
          } else {
            console.log(response.message);
            this.status = 'error';
          }
        },
        error => {
          console.log(error);
          this.status = 'error';
        }
      )
    }
  }

  

}
