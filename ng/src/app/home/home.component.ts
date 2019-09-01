import { Component, OnInit } from '@angular/core';
import { TallaService } from '../services/talla.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public identity;
  constructor(
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit() {
    
  }

  

}
