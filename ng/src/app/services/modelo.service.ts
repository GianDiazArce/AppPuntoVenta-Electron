import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class ModeloService {
    public url;
    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    getModelos():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'modelo', {headers});
    }
    
}