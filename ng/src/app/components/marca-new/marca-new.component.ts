import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from 'src/app/models/marca';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marca-new',
  templateUrl: './marca-new.component.html',
  styleUrls: ['./marca-new.component.css'],
  providers: [MarcaService]
})
export class MarcaNewComponent implements OnInit {

  public marca: Marca;

  constructor(
    private _marcaService: MarcaService,
    private _router: Router
  ) {
    this.marca = new Marca(1, '');
   }

  ngOnInit() {
  }

  onSubmit(form){
    this._marcaService.save(this.marca).subscribe(
      response => {
        if(response.status == 'success'){
          this._router.navigate(['/marca']);
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

}
