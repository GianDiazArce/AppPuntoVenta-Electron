import { Component, OnInit } from '@angular/core';
import { TallaService } from 'src/app/services/talla.service';

@Component({
  selector: 'app-talla',
  templateUrl: './talla.component.html',
  styleUrls: ['./talla.component.css'],
  providers: [TallaService]
})
export class TallaComponent implements OnInit {

  public tallas;
  pageActual: number = 1;
  constructor(
    private _tallaService: TallaService
  ) { }

  ngOnInit() {
    this.getTallas();
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

}
