import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class TipoService {

    public url;
    
    constructor(private _http: HttpClient) {
        this.url = global.url;
     }

    getTipos():Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'tipo', {headers});
    }

    save(tipo):Observable<any>{

        let params = "json="+JSON.stringify(tipo);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.post(this.url + 'tipo', params, {headers});
    }
    
}