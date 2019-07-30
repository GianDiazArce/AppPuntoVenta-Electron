import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class MarcaService {

    public url;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    getMarcas():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'marca', {headers});
    }

    save(marca):Observable<any>{

        let params = "json="+ JSON.stringify(marca);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'marca', params, {headers});
    }
    
}