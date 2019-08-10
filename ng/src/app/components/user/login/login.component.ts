import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User
  public status;
  public token;
  public identity;
  constructor(
    private _userService : UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.user = new User(1,'', '', '', 'ROLE_USER');
   }

  ngOnInit() {
    // se ejecuta siempre y cierra sesion solo si le llega el parametro sure en la url
    this.logout();
  }
  onSubmit(form){
    this._userService.login(this.user).subscribe(
      response => {
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          // Objeto usuario identificado
          this._userService.login(this.user, true).subscribe(
            response => {
              this.identity = response;
              // Persistir datos en local storage
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              localStorage.setItem('role', response.role);
              this._router.navigate(['inicio']);
              form.reset();
            },
            error => {
              console.log(error);
            }
          )
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  logout(){
    this._route.params.subscribe(
      params => {
        let logout = +params['sure'];
        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.identity = null;
          this.token = null;
          this._router.navigate(['inicio']);
        }
      }
    )
  }

}
