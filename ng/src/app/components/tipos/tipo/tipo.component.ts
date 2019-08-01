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

  constructor(
    private _tipoService: TipoService
  ) {
    this.tipo = new Tipo(1,'');
   }

  ngOnInit() {
    this.getTipos();
    
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
          document.getElementById('btnClose').click();
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

}
