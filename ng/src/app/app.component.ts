import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'ng';
  public identity;
  public token;
  public rol;

  constructor(
    private _userService: UserService
  ){
    this.loadUser();
  }
  ngOnInit(){
    console.log('WEB LISTA'); 
  }
  ngDoCheck(){
    this.loadUser();
  }
  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.rol = this._userService.getRol();
    
  }
  

  
}
