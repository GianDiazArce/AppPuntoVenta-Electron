import { Component, OnInit } from '@angular/core';
import { TallaService } from '../services/talla.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TallaService]
})
export class HomeComponent implements OnInit {

  public tallas;
  constructor(
    private _tallaService: TallaService
  ) { }

  ngOnInit() {
    this.getTallas();
  }

  getTallas(){
    this._tallaService.getTallas().subscribe(
      response => {
        console.log(response)
        if(response.status == 'success'){
          this.tallas = response.tallas;
          console.log(this.tallas)
        }
      },
      error => {
        console.log(error) ; 
      }
    )
  }

}
