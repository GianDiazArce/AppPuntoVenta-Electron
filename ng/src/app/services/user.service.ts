import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    public url;
    public identity;
    public token;
    public rol;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    login(user, gettoken = null): Observable<any>{
        if(gettoken !=null) {
            user.gettoken = true;
            
        }
        let params = "json=" + JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, {headers});
    }
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity && identity != undefined){
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }
    getToken(){
        let token = localStorage.getItem('token');

        if(token && token != undefined){
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }
    getRol(){
        
        let role = localStorage.getItem('role');

        if(role && role != undefined){
            this.rol = role;
        } else {
            this.rol = null;
        }
        return this.rol;
    }
    
}