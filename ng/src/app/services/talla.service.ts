import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class TallaService {
    public url;



    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    getTallas():Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'talla', {headers})
    }

    save(talla):Observable<any>{

        let params = "json=" + JSON.stringify(talla);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'talla', params, {headers});
    }

    getTalla(id):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'talla/' + id, {headers});
    }
    update(id,talla):Observable<any>{
        let params = "json="+ JSON.stringify(talla);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put(this.url + 'talla/' + id, params, {headers});
    }
    
}