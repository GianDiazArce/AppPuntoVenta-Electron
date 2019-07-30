import { Component, OnInit } from '@angular/core';
import { TallaService } from 'src/app/services/talla.service';
import { Talla } from 'src/app/models/talla';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talla-new',
  templateUrl: './talla-new.component.html',
  styleUrls: ['./talla-new.component.css'],
  providers: [TallaService]
})
export class TallaNewComponent implements OnInit {

  public talla: Talla;
  public status: string;

  constructor(
    private _tallaService: TallaService,
    private _router:Router
  ) {
    this.talla = new Talla(1,'');
   }

  ngOnInit() {
  }

  

  onSubmit(form){
    this._tallaService.newTalla(this.talla).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/talla']);
          form.reset();
        } else {
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
